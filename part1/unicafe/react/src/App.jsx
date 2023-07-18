import { useState } from 'react'
import './App.css'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increase = (state, feedback) => {
    const newState = () => {
      state(feedback + 1) 
    }
    return newState
  }
  return (
    <>
      <Title title={'give feedback'}/>
      <div>
        <Button handleClick={increase(setGood, good)} buttonName={'good'}/>
        <Button handleClick={increase(setNeutral, neutral)} buttonName={'neutral'}/>
        <Button handleClick={increase(setBad, bad)} buttonName={'bad'}/>
      </div>
      <Title title={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Title = ( { title }) => {
  return (
    <div>
      <h2> {title} </h2>
    </div>
  )
}

const Button = (props) => {
  console.log(props)
  return (
    <div>
      <button onClick={props.handleClick}> 
      { props.buttonName } 
      </button>
    </div>
  )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral

  if (total > 0) {
    return (
      <table>
        <tbody>
        <StatisticLine statName={'good'} good={good} neutral={neutral} bad={bad}/>
        <StatisticLine statName={'neutral'} good={good} neutral={neutral} bad={bad}/>
        <StatisticLine statName={'bad'} good={good} neutral={neutral} bad={bad}/>
        <StatisticLine statName={'all'} good={good} neutral={neutral} bad={bad}/>
        <StatisticLine statName={'average'} good={good} neutral={neutral} bad={bad}/>
        <StatisticLine statName={'positive'} good={good} neutral={neutral} bad={bad}/>
        </tbody>
      </table>
    )
  } else {
    return (
      <div>
        <p> No feedback given </p>
      </div>
    )
  }
}

const StatisticLine = (props) => {
  const total = props.good + props.bad + props.neutral
    switch (props.statName) {
    case 'all': 
      return (
          <tr>
            <td><p> {props.statName}</p></td> 
            <td><p>{total} </p></td>
          </tr>
      )
    case 'average':
      return (
          <tr>
            <td><p> {props.statName}</p></td> 
            <td><p>{(props.good - props.bad )/ total} </p></td>
          </tr>
      )
    case 'positive':
      return (
          <tr>
            <td><p> {props.statName}</p></td> 
            <td><p>{props.good / total} </p> </td>
          </tr>
      )
    case 'good':
      return (
          <tr>
            <td><p> {props.statName}</p> </td>
            <td><p>{props.good} </p></td>
          </tr>
      )
    case 'neutral':
      return (
          <tr>
            <td><p> {props.statName}</p></td> 
            <td><p>{props.neutral} </p> </td>
        </tr>
      )
    case 'bad':
      return (
          <tr>
            <td><p> {props.statName}</p></td>
            <td><p>{props.bad} </p></td>
          </tr>
      )
    }
  
}

export default App