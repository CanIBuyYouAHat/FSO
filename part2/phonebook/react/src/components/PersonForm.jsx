import phoneService from '../PhoneService'

const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, persons, setPersons, setNotif }) => {
    const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
    
      const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
      }
    
      const addPerson = (event) => {
        event.preventDefault()
        // persons.map(person => person.name === newName).includes(true)
        
        if (persons.some(person => person.name === newName)) {
          let id
          for (const person of persons) {
            if (person.name === newName) {
              id = person.id
            }
          }
          if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`) && id !== undefined) {
            const toUpdate = {
              name: newName,
              number: newNumber,
              id: newNumber,
            }
            phoneService
              .update(id, toUpdate).then (response => {
                setPersons(persons.map(person => {
                  if (person.name === newName) {
                    return { ...person, number: newNumber }
                  } else {
                    return person
                  }
                })) 
                setNotif(`Successfully updated ${newName}`)
                setTimeout(() => {setNotif(null)}, 2000)
            })
            
          }
          
          // alert(`${newName} is already added to phonebook`)
        } else {
          const newPerson = {
            name: newName,
            number: newNumber,
            id: newNumber
          }

          phoneService
            .create(newPerson)
            .then(response => {
                setPersons(persons.concat(newPerson))
                setNotif(`Successfully added ${newName}`)
                setTimeout(() => {setNotif(null)}, 2000)
            })    
          
        }
        setNewName('')
        setNewNumber('')
      }

    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm