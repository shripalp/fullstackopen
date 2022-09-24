//import logo from './logo.svg';
//import './App.css';
import { useState } from "react";

function App() {
  const [choice, setChoice] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
    total: 0,
  });

  const clickGood = () => {
    const newChoice = {
      ...choice,
      good: choice.good + 1,
      total: choice.total + 1,
    };
    setChoice(newChoice);
  };

  const clickNeutral = () => {
    const newChoice = {
      ...choice,
      neutral: choice.neutral + 1,
    };
    setChoice(newChoice);
  };

  const clickBad = () => {
    const newChoice = {
      ...choice,
      bad: choice.bad + 1,
      total: choice.total - 1,
    };
    setChoice(newChoice);
  };

  const all = choice.good + choice.neutral + choice.bad;
  const average = choice.total / all;
  const positive = (choice.good / all) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={clickGood} text="good" />
      <Button handleClick={clickNeutral} text="neutral" />
      <Button handleClick={clickBad} text="bad" />

      <Results
        good={choice.good}
        neutral={choice.neutral}
        bad={choice.bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Results = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h2>statistcis</h2>
        No feedback given!!
      </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>

      <StatisticLine text="good" value={props.good} />

      <StatisticLine text="neutral" value={props.neutral} />

      <StatisticLine text="bad" value={props.bad} />

      <StatisticLine text="all" value={props.all} />

      <StatisticLine text="average" value={props.average} />

      <StatisticLine text="positive" value={props.positive + "%"} />
    </div>
  );
};

export default App;
