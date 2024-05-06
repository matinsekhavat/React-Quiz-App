import React, { useEffect } from "react";

function Timer({ secondsRemain, dispatch }) {
  const minute = Math.floor(secondsRemain / 60);

  const second = secondsRemain % 60;

  useEffect(() => {
    const timerInterval = setInterval(
      () => dispatch({ type: "timerRemain" }),
      1000
    );

    return () => clearInterval(timerInterval);
  }, [dispatch]);

  return (
    <div className="timer">
      {minute < 10 ? `0${minute}` : minute} :{" "}
      {second < 10 ? `0${second}` : second}
    </div>
  );
}

export default Timer;
