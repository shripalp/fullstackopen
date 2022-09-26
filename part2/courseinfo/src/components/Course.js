//import React from "react";

//console.log("Course app is working...");

const Header = (props) => {
  //console.log(title);
  //console.log("header is working...", course);
  return <h2>{props.course}</h2>;
};

const Part = (props) => (
  <>
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  </>
);

const Content = (props) => {
  return props.parts.map((part) => <Part key={part.id} part={part} />);
};

const Total = (props) => {
  const total = props.parts.reduce((s, p) => s + p.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};

const Course = (props) => {
  console.log(props);
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;
