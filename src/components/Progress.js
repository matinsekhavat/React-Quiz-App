import React from "react";

function Progress({ index, questions, point, answer, maxPossiblePoints }) {
  const numQuestions = questions.length;

  //   const progressPercent =
  //     answer !== null
  //       ? ((index + 1) / numQuestions) * 100
  //       : (index / numQuestions) * 100;

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Questions{" "}
        <strong>
          {" "}
          {index} / {numQuestions}{" "}
        </strong>{" "}
      </p>
      <p>{maxPossiblePoints}</p>
      <h4>{point}</h4>
    </header>
  );
}

export default Progress;
