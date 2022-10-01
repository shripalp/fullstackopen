const Display = (props) => {
  if (props.country[1] === " ") {
    props.country.pop();
    //props.country.pop();
  }
  if (props.country.length === 1) {
    return <h3>{props.country}</h3>;
  } else {
    return props.country.map((country, i) => {
      return (
        <div key={i}>
          <p>{country}</p>
          <button
            type="button"
            value={props.country[i]}
            onClick={props.showCountry}
          >
            show
          </button>
        </div>
      );
    });
  }
};
export default Display;
