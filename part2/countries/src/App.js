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
      setFilterCountries(countryListFilter);
      console.log(countryListFilter);
    } else if (countryList.length === 1) {
      countryListFilter = countryList.map((country) => country);
      setFilterCountries(countryListFilter);
      console.log("one matched", countryListFilter);
    } else if (countryList.length > 10) {
      countryListFilter = ["too many matches, specify another filter", ".."];
      setFilterCountries(countryListFilter);
    } else {
      countryListFilter = ["No match", ".."];
      setFilterCountries(countryListFilter);
    }
    //console.log(countryListFilter);

    console.log("filtered", filterCountries);
  };

  return (
    <>
      <div>
        <Search value={search} onChange={handleSearch} />

        {filterCountries.length === 1 ? (
          <DisplayOne country={filterCountries} />
        ) : (
          <Display country={filterCountries} />
        )}
      </div>
    </>
  );
};

export default App;
