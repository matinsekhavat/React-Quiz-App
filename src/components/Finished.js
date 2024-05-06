import React from "react";

function Finished({ point, maxPossiblePoints, highScore, dispatch }) {
  const percentage = (point / maxPossiblePoints) * 100;
  let emoji = "💔";
  percentage === 100 && (emoji = "✅");
  percentage > 20 && (emoji = "🙄");
  percentage > 40 && (emoji = "😀");
  percentage > 60 && (emoji = "😘");
  percentage > 80 && (emoji = "😍");
  return (
    <>
      <p className="result">
        {emoji} you scored{" "}
        {` ${point} out of ${maxPossiblePoints}(${percentage.toFixed()}%).`}
      </p>
      <p className="highscore">HighScore: {highScore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default Finished;
