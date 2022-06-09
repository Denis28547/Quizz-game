import React from "react";

export default function Startpage(props) {
  return (
    <div className="startpage">
      <div className="startpage--items">
        <h1 className="startpage--title">Quizzical</h1>
        {/* <p className="startpage--text">Start quizz game</p> */}
        <button className="startpage--button" onClick={props.changePage}>
          Start quiz
        </button>
      </div>
    </div>
  );
}
