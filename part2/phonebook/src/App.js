import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('John Doe')

  const addPerson = (event) => {
    event.preventDefault();
    
    if (persons.find(person => person.name === newName)) { // check if name in persons
      alert(`${newName} is already added to the phonebook`);
    } else {
      let newPerson = {
        name: newName,
      }
      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
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
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App