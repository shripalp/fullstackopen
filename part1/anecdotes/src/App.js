import { useState } from "react";
function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  let num = Math.floor(Math.random() * anecdotes.length);
  const fillVotesArrWithZero = (num) => (num = 0);
  const [selected, setSelected] = useState(num);
  const [votes, setVotes] = useState(anecdotes.map(fillVotesArrWithZero));

  const nextAnecdote = () => {
    num = Math.floor(Math.random() * anecdotes.length);

    setSelected(num);
  };

  const updateVotes = (x) => {
    const arr = [...votes];
    arr[x] = arr[x] + 1;

    setVotes(arr);
  };

  const maxVotes = (y) => Math.max(...y);
  const valueWithMostVotes = (x, y) => {
    let i = y.indexOf(Math.max(...y));
    return x[i];
  };

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button onClick={() => updateVotes(selected)} text="vote" />
      <Button onClick={nextAnecdote} text="next anecdote" />

      <h1>Anecdotes with most votes</h1>
      <p> {valueWithMostVotes(anecdotes, votes)}</p>
      <p>has {maxVotes(votes)} votes</p>
    </div>
  );
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

export default App;
