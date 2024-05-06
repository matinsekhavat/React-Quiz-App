import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
  questions: [],
  // "Loading","error","Ready","active","finished"
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  highScore: 0,
  isRestart: false,
  seconds: null,
};
// 30 sec for each Questions
const SEC_PER_QUESTIONS = 30;

function reducer(state, { type, payload }) {
  switch (type) {
    case "dataRecieved": {
      return {
        ...state,
        status: "ready",
        questions: payload,
        isRestart: false,
      };
    }
    case "dataFailed": {
      return { ...state, status: "error" };
    }
    case "start": {
      return {
        ...state,
        status: "active",
        seconds: state.questions.length * SEC_PER_QUESTIONS,
      };
    }
    case "newAnswer": {
      return {
        ...state,
        answer: payload,
        point:
          state.point +
          (payload === state.questions[state.index].correctOption
            ? state.questions[state.index].points
            : 0),
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "finished": {
      return {
        ...state,

        status: "finished",
        highScore:
          state.point > state.highScore ? state.point : state.highScore,
      };
    }
    case "restart": {
      return {
        ...initialState,
        // questions: state.questions,
        // loading: "ready",
        isRestart: true,
        highScore:
          state.point > state.highScore ? state.point : state.highScore,
      };
    }
    case "timerRemain": {
      return {
        ...state,
        seconds: state.seconds <= 0 ? 0 : state.seconds - 1,
        status: state.seconds <= 0 ? "finished" : state.status,
      };
    }
    default:
      throw new Error("Action Unkonow");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numQuestions = state.questions.length;
  const allPoints = state.questions.reduce((acc, curr) => acc + curr.points, 0);
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch("http://localhost:4000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });

        if (!res.ok) throw new Error("error message");
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuiz();
  }, [state.isRestart]);

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Progress
              index={state.index}
              questions={state.questions}
              point={state.point}
              answer={state.answer}
              maxPossiblePoints={allPoints}
            />
            <Question
              questions={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />

            <Footer>
              <Timer secondsRemain={state.seconds} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                index={state.index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {state.status === "finished" && (
          <Finished
            point={state.point}
            maxPossiblePoints={allPoints}
            highScore={state.highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
