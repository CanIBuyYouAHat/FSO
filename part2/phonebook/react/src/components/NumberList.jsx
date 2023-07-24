import phoneService from '../PhoneService'

const NumberList = ( { newFilter, persons, setNotif, setPersons }) => {

    const deletePerson = (id, person) => {
        if (window.confirm(`Are you sure you want to delete ${person.name}`))
        phoneService
            .remove(id)
            .then(response => {
                console.log('deleted')
                setPersons(persons.filter(person => person.id !== id))
                setNotif(`Successfully deleted ${person.name}`)
                setTimeout(() => {setNotif(null)}, 2000)
            })
            .catch(err => {
                console.log(err.message)
                setNotif(`Information of ${person.name} has already been deleted`)
                setTimeout(() => {setNotif(null)}, 2000)
            })
    }

    if (newFilter === ''){
        return (
                persons.map(person => <li key={person.id}>{person.name} {person.number} <button type="button" onClick={() => deletePerson(person.id, person)}>delete</button> </li> )   
        )
    } else {
        return( 
            persons.filter(person => person.name.toLowerCase().includes(newFilter)).map(person => <li key={person.id}>{person.name} {person.number} <button type="button" onClick={() => deletePerson(person.id, person)}>delete</button> </li>)
        )
    }

}

export default NumberList