const Search = (props) => {
  return (
    <>
      <h2>Phonebook</h2>

      <div>
        filter shown with:{" "}
        <input value={props.search} onChange={props.handleSearch} />
      </div>
    </>
  );
};
export default Search;
