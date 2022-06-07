import React from "react";
import { nanoid } from "nanoid";
import QuestionMaker from "./QuestionMaker";

export default function Questions() {
  const [info, setInfo] = React.useState([]);
  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const URL = "https://opentdb.com/api.php?amount=5&type=multiple";

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const allData = data.results.map((item) => {
          const allAnswers = [...item.incorrect_answers];
          allAnswers.splice(
            //places correct answer in random place in array of incorrect answers
            Math.floor(Math.random() * allAnswers.length),
            0,
            item.correct_answer
          );

          const allAnswers_ID = allAnswers.map((item) => {
            return {
              id: nanoid(),
              isHeld: false,
              answer: item,
            };
          });

          return {
            question: item.question,
            answers: allAnswers_ID,
            correct_answer: item.correct_answer,
            id: nanoid(),
            key: nanoid(),
          };
        });
        setInfo(allData);
      });
  };

  function chooseAnswer(selectedId, selectedQuestionId) {
    const newInfo = info.map((item) => {
      if (item.id === selectedQuestionId) {
        return {
          ...item,
          answers: item.answers.map((answer) => {
            return answer.id === selectedId
              ? { ...answer, isHeld: !answer.isHeld }
              : { ...answer, isHeld: false };
          }),
          scored:
            item.correct_answer ===
            item.answers.find((answer) => answer.id === selectedId).answer
              ? true
              : false,
        };
      } else {
        return item;
      }
    });
    setInfo(newInfo);
  }

  function checkAns() {
    setGameOver(true);
  }

  function restartQuiz() {
    window.location.reload();
  }

  function countCorrectAnswers() {
    let scoredCount = 0;
    info.forEach((question) => {
      question.scored && scoredCount++;
    });
    return scoredCount;
  }

  if (info) {
    const questions = info.map((item) => {
      return (
        <QuestionMaker
          {...item}
          handleClick={chooseAnswer}
          gameOver={gameOver}
        />
      );
    });
    return (
      <div className="questions">
        {questions}
        {gameOver && (
          <p className="questions--check_correct_answers">
            You scored {countCorrectAnswers()} / {info.length} correct answers
          </p>
        )}
        <button
          className="questions--check_answers"
          onClick={gameOver ? restartQuiz : checkAns}
        >
          {gameOver ? "Play again" : "Check answers"}
        </button>
      </div>
    );
  }
}
