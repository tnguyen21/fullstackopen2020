import React, { useState, useEffect } from 'react';
import phonebookService from './services/people';

const Input = ({text, placeholder, onChangeHandler}) => {
  return (
    <div>
      {text} <input
        value={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  )
}

const PersonsForm = ({onSubmit, inputs}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        {inputs.map((input, i) => 
          <Input key={i} text={input.text} placeholder={input.placeholder} onChangeHandler={input.onChangeHandler} /> 
        )}
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <form onSubmit={deletePerson}>
      {person.name} | {person.number}
      <button type="submit">delete</button>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('John Doe');
  const [newNumber, setNewNumber] = useState('123-456-7890');
  const [search, setNewSearch] = useState('');
  
  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  const displayedPersons = persons.filter((person) => person.name.toLowerCase().includes(search));

  const addPerson = (event) => {
    event.preventDefault();
    
    if (persons.find(person => person.name === newName)) { // check if name in persons
      alert(`${newName} is already added to the phonebook`);
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
      }
      phonebookService
        .createPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      phonebookService
        .deletePerson(person.id)
    }

  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input text="filter shown with:" placeholder={search} onChangeHandler={handleSearchChange} />
      <h2>add a new</h2>
      <PersonsForm onSubmit={addPerson} inputs={
        [
          {text:"name:", placeholder:newName, onChangeHandler:handleNameChange},
          {text:"number:", placeholder:newNumber, onChangeHandler:handleNumberChange},
        ]
      } />
      <h2>Numbers</h2>
      {displayedPersons.map((person) => 
        <Person 
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person)}
        />
      )}
    </div>
  )
}

export default App