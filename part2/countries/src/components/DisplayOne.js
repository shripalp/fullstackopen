const DisplayOne = (props) => {
  return (
    <>
      <h1>{props.country[0].name.common}</h1>
      <p> capital {props.country[0].capital}</p>
      <p>area {props.country[0].area} </p>
      <h2>languages</h2>
      <ul>
        {Object.keys(props.country[0].languages).map((lang, i) => (
          <li key={i}>{props.country[0].languages[lang]}</li>
        ))}
      </ul>
      <img
        src={props.country[0].flags.png}
        alt="flag"
        style={{ width: "200px" }}
      />
    </>
  );
};
export default DisplayOne;
