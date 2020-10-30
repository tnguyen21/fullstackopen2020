import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const Persons = ({ displayedPersons }) => {
  return (
    <div>
      {displayedPersons.map((person) => <div key={person.name}>{person.name} | {person.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('John Doe');
  const [newNumber, setNewNumber] = useState('123-456-7890');
  const [search, setNewSearch] = useState('');
  
  useEffect(() => {
    console.log("effect");
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
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
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
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
      <Persons displayedPersons={displayedPersons} />
    </div>
  )
}

export default App