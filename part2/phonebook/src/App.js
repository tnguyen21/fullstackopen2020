import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '012-345-6789' }
  ]) 
  const [ newName, setNewName ] = useState('John Doe');
  const [ newNumber, setNewNumber ] = useState('123-456-7890');

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => <div key={person.name}>{person.name} | {person.number}</div>)}
    </div>
  )
}

export default App