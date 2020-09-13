import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('John Doe');
  const [newNumber, setNewNumber] = useState('123-456-7890');
  const [search, setNewSearch] = useState('');
  
  let displayedPersons = persons.filter((person) => person.name.toLowerCase().includes(search));

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
      filter shown with: <input
        value={search}
        onChange={handleSearchChange}
      />

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
          <br/>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayedPersons.map((person) => <div key={person.name}>{person.name} | {person.number}</div>)}
    </div>
  )
}

export default App