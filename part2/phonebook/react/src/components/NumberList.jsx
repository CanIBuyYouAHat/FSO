import phoneService from '../PhoneService'

const NumberList = ( { newFilter, persons }) => {

    const deletePerson = (id, person) => {
        if (window.confirm(`Are you sure you want to delete ${person.name}`))
        phoneService
            .remove(id)
            .then(
                setPersons(persons.filter(person => person.id !== id))
            )
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