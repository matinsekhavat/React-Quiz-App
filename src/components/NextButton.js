import React from "react";

function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  const isEndOfQuestions = index < numQuestions - 1;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        isEndOfQuestions
          ? dispatch({ type: "nextQuestion" })
          : dispatch({ type: "finished" })
      }
    >
      {isEndOfQuestions ? "NextQuestions" : "finished"}
    </button>
  );
}

export default NextButton;
