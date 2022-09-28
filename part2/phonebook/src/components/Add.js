const Add = (props) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={props.addPerson}>
        <div>
          <p>
            name:{" "}
            <input value={props.newName} onChange={props.handleNameChange} />
          </p>
          <p>
            number:{" "}
            <input
              value={props.newNumber}
              onChange={props.handleNumberChange}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Add;
