import React from "react";
import Options from "./Options";
function Question({ questions, dispatch, answer }) {
  return (
    <div>
      <h4>{questions.question}</h4>

      <div className="options">
        <Options
          key={crypto.randomUUID()}
          questions={questions}
          dispatch={dispatch}
          answer={answer}
        />
      </div>
    </div>
  );
}

export default Question;
