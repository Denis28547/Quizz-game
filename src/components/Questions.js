import React from "react";
import { nanoid } from "nanoid";
import QuestionMaker from "./QuestionMaker";

export default function Questions() {
  const [info, setInfo] = React.useState([]);

  React.useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const URL = "https://opentdb.com/api.php?amount=10&type=multiple";

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

          // setAnswerssss(() => {
          //   return allAnswers.map((item) => {
          //     return {
          //       id: nanoid(),
          //       isHeld: false,
          //       answer: item,
          //     };
          //   });
          // });

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
    setInfo((prevInfo) => {
      prevInfo.map((item) => {
        if (item.id === selectedQuestionId) {
          return {
            ...item,
            answers: item.answers.map((answer) => {
              return answer.id === selectedId
                ? { ...answer, isHeld: !answer.isHeld }
                : { ...answer, isHeld: false };
            }),
          };
        } else {
          return item;
        }
      });
    });
  }

  console.log(info);

  // function chooseAnswer(id, selectedQuestion) {
  //   setInfo((prevInfo) => {
  //     prevInfo.map((item) => {
  //       return item.question !== selectedQuestion
  //         ? item
  //         : {
  //             ...item,
  //             answers: item.answers.map((answer) => {
  //               return answer.id !== id
  //                 ? answer
  //                 : {
  //                     ...answer,
  //                     isHeld: true,
  //                   };
  //             }),
  //           };
  //     });
  //   });
  // }

  if (info) {
    const questions = info.map((item) => {
      return <QuestionMaker {...item} handleClick={chooseAnswer} />;
    });
    return <div className="questions">{questions}</div>;
  }
}
