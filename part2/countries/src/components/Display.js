//import Person from "./Person";

const Display = (props) => {
  return props.country.map((country, i) => <p key={i}>{country}</p>);
};
export default Display;
