import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stat = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Stats = ({good, neutral, bad}) => {
  if ((good + neutral + bad) === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  };
  
  let average = (good * 1 + bad * -1) / (good+neutral+bad);
  let positive = good / (good+neutral+bad);
  return (
    <div>
      <table>
        <Stat text="good" value={good} />
        <Stat text="neutral" value={neutral} />
        <Stat text="bad" value={bad} />
        <Stat text="average" value={average} />
        <Stat text="positive" value={positive} />
      </table>
    </div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick = {onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick={() => setGood(good + 1)} text="good"/>
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
        <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
