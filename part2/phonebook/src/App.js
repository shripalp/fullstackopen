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
    const duplicateContact = persons.find(
      (person) => person.name === newName && person.number === newNumber
    );
    console.log("button clicked", event.target);

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
      //id: persons.length + 1,
    };

    const names = persons.map((person) => person.name);
    //const numbers = persons.map((person) => person.number);
    //const id = persons.map((person)=> person.id)
    if (duplicateContact) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    } else if (names.includes(personObject.name)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        ) === true
      ) {
        const getContact = persons.find(
          (person) => person.name === personObject.name
        );
        const changedContact = { ...getContact, number: newNumber };
        console.log(changedContact);
        contactService
          .update(changedContact)
          .then((retrunedContact) =>
            setPersons(
              persons.map((person) =>
                person.id !== retrunedContact.id ? person : retrunedContact
              )
            )
          );
        setNewName("");
        setNewNumber("");
      } else {
        alert("update cancelled");
        setNewName("");
        setNewNumber("");
      }
    } else {
      contactService.create(personObject).then((returnedPerson) => {
        //console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const removeContact = (event) => {
    const id = event.target.id;
    console.log(id);
    contactService
      .remove(id)
      .then(setPersons(persons.filter((person) => person.id !== id)));
  };

  const hook = () => {
    console.log("effect");
    contactService.getAll().then((allContact) => {
      console.log(allContact);
      setPersons(allContact);
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
      <Display removeContact={removeContact} persons={personsToShow} />
    </div>
  );
};

export default App;
