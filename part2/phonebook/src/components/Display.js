import Person from "./Person";

const Display = (props) => {
  return (
    <>
      <h2>Numbers</h2>
      {props.persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  );
};
export default Display;
