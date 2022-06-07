import React from "react";
import { nanoid } from "nanoid";

export default function QuestionMaker(props) {
  function styleChooser(item) {
    if (props.gameOver && item.answer === props.correct_answer) {
      const styles = {
        backgroundColor: "#94D7A2",
      };
      return styles;
    }

    if (props.gameOver && !props.scored && item.isHeld) {
      const styles = {
        backgroundColor: "#dc868762",
      };
      return styles;
    }

    if (item.isHeld) {
      const styles = {
        backgroundColor: "#D6DBF5",
      };
      return styles;
    }
  }

  const buttons = props.answers.map((item) => (
    <button
      className="question--buttons"
      style={styleChooser(item)}
      key={nanoid()}
      onClick={() =>
        !props.gameOver ? props.handleClick(item.id, props.id) : null
      }
    >
      {item.answer}
    </button>
  ));

  return (
    <div>
      <div className="question--container">
        <h1 className="question--title">{props.question}</h1>
        {buttons}
        <hr className="questions--line" />
      </div>
    </div>
  );
}
