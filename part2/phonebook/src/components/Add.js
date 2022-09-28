const Add = (props) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          <p>
            name:{" "}
            <input value={props.name.value} onChange={props.name.onChange} />
          </p>
          <p>
            number:{" "}
            <input
              value={props.number.value}
              onChange={props.number.onChange}
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
