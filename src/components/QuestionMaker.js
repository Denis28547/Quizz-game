import React from "react";
import { nanoid } from "nanoid";

export default function QuestionMaker(props) {
  function yoba(isHeld) {
    const styles = {
      backgroundColor: isHeld ? "#D6DBF5" : "transparent",
    };
    return styles;
  }

  // console.log(props.id);

  const buttons = props.answers.map((item) => (
    // <label key={nanoid()}>
    //   {item.answer}
    //   <input
    //     type="radio"
    //     // key={nanoid()}
    //     id={item.answer}
    //     className="question--buttons"
    //   />
    // </label>
    <button
      className="question--buttons"
      style={yoba(item.isHeld)}
      key={nanoid()}
      onClick={() => props.handleClick(item.id, props.id)}
    >
      {item.answer}
    </button>
  ));

  return (
    <div className="question--container">
      <h1 className="question--title">{props.question}</h1>
      {buttons}
    </div>
  );
}
