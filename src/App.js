import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import questionsArray from "./constants/questionsArray";
import Questions from "./components/Questions";
import { Typography } from "@material-ui/core";

function App() {
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [questionAnswer, setQuestionAnswer] = useState({});

  useEffect(() => {
    setQuestions(questionsArray);
    setQuestionAnswer(questionsArray[0]);
  }, []);

  let handleChangeInput = (e) => {
    setQuestionAnswer({
      ...questionAnswer,
      answer: e.target.value,
    });
  };

  let nextQuestion = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    questions.map((question) => {
      if (question.resumeFieldId === questionAnswer.resumeFieldId) {
        setAnswers([
          ...answers,
          { ...question, answer: questionAnswer.answer },
        ]);
      }
    });
    // eslint-disable-next-line
    questions.map((qa, index) => {
      if (index <= questions.length) {
        if (qa.resumeFieldId === questionAnswer.resumeFieldId) {
          // eslint-disable-next-line
          setQuestionAnswer(questions[index + 1]);
        }
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        state: {
          questionAnswer,
          questions,
          answers,
        },
        function: {
          handleChangeInput: handleChangeInput,
          nextQuestion: nextQuestion,
        },
      }}
    >
      <div className="App">
        <Typography
          variant="h6"
          style={{
            textAlign: "center",
            margin: "2rem",
          }}
        >
          CV Application
        </Typography>
        <Questions />
      </div>
    </AppContext.Provider>
  );
}

export default App;
