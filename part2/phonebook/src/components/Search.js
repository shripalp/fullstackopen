const Search = (props) => {
  return (
    <>
      <h2>Phonebook</h2>

      <div>
        filter shown with:{" "}
        <input value={props.value} onChange={props.onChange} />
      </div>
    </>
  );
};
export default Search;
