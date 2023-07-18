import "./App.css"

const Course = (props) => {
    const course = props.course
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
  const Header = (props) => {
    return (
      <header>
        <h1>{props.course}</h1>
      </header>
    )
  }
  
  const Content = (props) => {
    const parts = props.parts
    return (
      <div>
        <ul>
          {parts.map(part => <Part key={part.id} part={part} />)}
          {/* <Part keypart={props.parts[0]}/>
          <Part part={props.parts[1]}/>
          <Part part={props.parts[2]}/> */}
        </ul>
      </div>
    )
  }
  
  const Total = (props) => {
    const parts = props.parts
    return (
      <div>
        <p>
          Number of exercises {parts.reduce((total, curr) => total + curr.exercises, 0)}
        </p>
      </div>
    )
  }
  
  const Part = ({ part: { name, exercises } }) => {
    return (
      <div>
        <li>
          {name} {exercises}
        </li>
      </div>
    )
  }

  export default Course