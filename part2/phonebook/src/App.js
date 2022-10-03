import { useState, useEffect } from "react";
//import axios from "axios";

import Search from "./components/Search";
import Display from "./components/Display";
import Form from "./components/Form";
import contactService from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMsg, setNotificationMsg] = useState(null);

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
          person.name.toLowerCase().startsWith(search.toLowerCase())
        );

  const addPerson = (event) => {
    event.preventDefault();
    const duplicateContact = persons.find(
      (person) =>
        person.name === newName.trim() && person.number === newNumber.trim()
    );
    console.log("button clicked", event.target);

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
      //id: persons.length + 1,
    };

    const names = persons.map((person) => person.name);

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
        const changedContact = { ...getContact, number: personObject.number };

        contactService
          .update(changedContact)
          .then((retrunedContact) => {
            setNotificationMsg({
              text: `${retrunedContact.name} phone number is now updated`,
              type: "notification",
            });
            setTimeout(() => {
              setNotificationMsg(null);
            }, 3000);

            setPersons(
              persons.map((person) =>
                person.id !== retrunedContact.id ? person : retrunedContact
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationMsg({
              text: `person already removed from the server`,
              type: "error",
            });
          });
        setTimeout(() => {
          setNotificationMsg(null);
        }, 5000);
      } else {
        alert("update cancelled");
        setNewName("");
        setNewNumber("");
      }
    } else {
      contactService
        .create(personObject)
        .then((returnedPerson) => {
          setNotificationMsg({
            text: `${returnedPerson.name} is added to the phonebook`,
            type: "notification",
          });
          setTimeout(() => {
            setNotificationMsg(null);
          }, 3000);
          //console.log(returnedPerson);
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setNotificationMsg({
            text: "server error",
            type: "error",
          });
        });
      setTimeout(() => {
        setNotificationMsg(null);
      }, 5000);
    }
  };
  const removeContact = (event) => {
    const id = event.target.id;
    const n = event.target.name;
    const message = `delete this person ${n}?`;
    if (window.confirm(message) === true) {
      contactService
        .remove(id)
        .then((removedPerson) => {
          console.log(removedPerson);
          setNotificationMsg({
            text: `${n}  is removed from server`,
            type: "notification",
          });
          setTimeout(() => {
            setNotificationMsg(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMsg({
            text: `${n} already removed from server`,
            type: "error",
          });
        });
      setTimeout(() => {
        setNotificationMsg(null);
      }, 5000);

      setPersons(persons.filter((person) => person.id !== id));
    }
    //console.log(id);
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
      <h1>Phonebook</h1>

      {notificationMsg !== null ? <Notification msg={notificationMsg} /> : null}
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
