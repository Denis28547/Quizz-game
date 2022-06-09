import React from "react";

export default function Startpage(props) {
  return (
    <div className="startpage">
      <div className="startpage--items">
        <h1 className="startpage--title">Quizzical</h1>
        <button className="startpage--button" onClick={props.changePage}>
          Start quiz
        </button>
      </div>
    </div>
  );
}
