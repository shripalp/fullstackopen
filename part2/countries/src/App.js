import { useState, useEffect } from "react";
import axios from "axios";

import Search from "./components/Search";
import Display from "./components/Display";
import DisplayOne from "./components/DisplayOne";

const App = () => {
  let countryList;
  let countryListFilter;

  const [countries, setCountry] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  //const [filteredCountry, setFilteredCountry] = useState([]);
  const [search, setSearch] = useState("");

  const url = "https://restcountries.com/v3.1/all";
  const hook = () => {
    axios.get(url).then((response) => {
      console.log("promise fulfilled");
      setCountry(response.data);
    });
  };

  useEffect(hook, []);

  //const countryList = countries.map((country) => country.name.common);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    countryList = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    //console.log(countryList);

    if (countryList.length < 10 && countryList.length > 1) {
      countryListFilter = countryList.map((countries) => countries.name.common);
    } else if (countryList.length === 1) {
      countryListFilter = countryList.map((country) => country);
    } else if (countryList.length > 10) {
      countryListFilter = ["too many matches, specify another filter", " "];
    } else {
      countryListFilter = ["No Match", " "];
    }

    setFilterCountries(countryListFilter);
  };
  const showCountry = (event) => {
    console.log("button pressed", event.target.value);
    countryListFilter = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .startsWith(event.target.value.toLowerCase())
    );
    console.log(countryListFilter);

    setFilterCountries(countryListFilter);
  };

  return (
    <>
      <div>
        <Search value={search} onChange={handleSearch} />

        {filterCountries.length === 1 ? (
          <DisplayOne country={filterCountries} />
        ) : (
          <Display country={filterCountries} showCountry={showCountry} />
        )}
      </div>
    </>
  );
};

export default App;
