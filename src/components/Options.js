import React from "react";

function Options({ questions, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div>
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}  ${
            hasAnswered && questions.correctOption === index
              ? "correct"
              : "wrong"
          }
          ${
            questions.correctOption !== index && answer === index
              ? "user-wrong-answer"
              : ""
          }
          `}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
