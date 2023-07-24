import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import NumberList from './components/NumberList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phoneService from './PhoneService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notif, setNotif] = useState(null)
  
  const hook = () => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  

  useEffect(hook, [])

  return (
    <div>
      <Notification message={notif} />
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setNotif={setNotif}/>
      <h2>Numbers</h2>
      <ul> <NumberList newFilter={newFilter} persons={persons} setPersons={setPersons} setNotif={setNotif}/></ul>
    </div>
  )
}

export default App