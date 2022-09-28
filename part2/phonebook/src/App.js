import { useState } from "react";

import Search from "./components/Search";
import Display from "./components/Display";
import Add from "./components/Add";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  //const [showFilter, setShowFilter] = useState(true);

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const personsToShow =
    search === ""
      ? persons
      : persons.filter((person) =>
          person["name"].toLowerCase().startsWith(search)
        );
  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const personObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1,
    };
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <Search value={search} onChange={handleSearch} />
      <Add
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        onSubmit={addPerson}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      <Display persons={personsToShow} />
    </div>
  );
};

export default App;
