const Display = (props) => {
  return (
    <>
      <h2>Numbers</h2>
      {props.persons.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}
          <button
            name={person.name}
            id={person.id}
            onClick={props.removeContact}
          >
            delete
          </button>
        </p>
      ))}
    </>
  );
};
export default Display;
