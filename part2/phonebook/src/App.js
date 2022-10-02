import { useState, useEffect } from "react";
//import axios from "axios";

import Search from "./components/Search";
import Display from "./components/Display";
import Form from "./components/Form";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
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
          person["name"].toLowerCase().startsWith(search.toLowerCase())
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
    contactService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const hook = () => {
    console.log("effect");
    contactService.getAll().then((initialContact) => {
      setPersons(initialContact);
    });
  };
  useEffect(hook, []);

  return (
    <div>
      <Search value={search} onChange={handleSearch} />
      <Form
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
