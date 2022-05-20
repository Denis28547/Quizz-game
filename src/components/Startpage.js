import React from "react";

export default function Startpage(props) {
  return (
    <div className="startpage">
      <div className="startpage--items">
        <h1 className="startpage--title">Quizzical</h1>
        <p className="startpage--text">Start funny(not) quizz game</p>
        <button className="startpage--button" onClick={props.changePage}>
          Start quiz
        </button>
      </div>
      <img src="/images/blob-top.png" className="startpage--image-top"></img>
      <img src="/images/blob-bot.png" className="startpage--image-bottom"></img>
    </div>
  );
}
