import { useEffect, useState } from "react";
import { weekdays, months } from "./data";
import { AiOutlineAppstoreAdd, AiOutlineSend } from "react-icons/ai";
import Todos from "./Todos";
import { addTodo } from "../api";
import ErrorHandler from "./ErrorHandler";
import LoadingHandler from "./LoadingHandler";
import { useErrorContext } from "./context";

const Todo = () => {
  const [date, setDate] = useState({
    date: "00",
    month: "Month",
    year: "0000",
    weekday: "Someday",
  });

  const { loading, showLoading, error, showError } =
    useErrorContext();

  useEffect(() => {
    const date = new Date();
    const dateData = {
      date: date.getDate().toString(),
      month: months[date.getMonth()],
      year: date.getFullYear().toString(),
      weekday: weekdays[date.getDay()].toUpperCase(),
    };
    setDate(dateData);
  }, []);

  const [todo, setTodo] = useState("");
  const [view, setView] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    showLoading();
    if (todo !== "") {
      const data = {
        text: todo,
      };
      addTodo(data)
        .then((res) => {
          // console.log(res);
          setTodo("");
        })
        .catch((err) => {
          showError(err);
        });
    } else {
    }
  }, [todo]);

  return (
    <div className="Website">
      {error && <ErrorHandler error={error} />}
      {loading && <LoadingHandler />}
      <div className="Screen">
        <header className="header">
          <div className="dates">
            <div className="date">{date.date}</div>
            <div className="monthyear">
              <span className="month">{date.month}</span>
              <span>{date.year}</span>
            </div>
          </div>
          <div
            className="addTodo"
            onClick={() => {
              setView(true);
            }}
          >
            <AiOutlineAppstoreAdd size={30} />
          </div>
          <div className="day">{date.weekday}</div>
        </header>
        <Todos todo={todo} />
      </div>
      <form
        className={`inputDialog${view ? "active" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          setTodo(inputText);
          setInputText("");
          setView(false);
        }}
      >
        <input
          className="inputBox"
          name="inputBox"
          autoComplete="off"
          placeholder="Enter a new task"
          value={`${inputText}`}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        ></input>
        <button type="submit" className="inputButton">
          <AiOutlineSend size={30} />
        </button>
      </form>
    </div>
  );
};

export default Todo;
