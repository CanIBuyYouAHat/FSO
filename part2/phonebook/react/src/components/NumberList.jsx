const NumberList = ( { newFilter, persons }) => {
    if (newFilter === ''){
        return (
            persons.map(person => <li key={person.id}>{person.name} {person.number} </li> )    
        )
    } else {
        return( 
            persons.filter(person => person.name.toLowerCase().includes(newFilter)).map(person => <li key={person.id}>{person.name} {person.number}</li>) 
        )
    }

}

export default NumberList