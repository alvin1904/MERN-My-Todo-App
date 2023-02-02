import { useEffect, useState } from "react";
import { weekdays, months } from "./data";
import { AiOutlineAppstoreAdd, AiOutlineSend } from "react-icons/ai";
import Todos from "./Todos";
import { addTodo } from "../api";

const Todo = () => {
  const [date, setDate] = useState({
    date: "00",
    month: "Month",
    year: "0000",
    weekday: "Someday",
  });

  useEffect(() => {
    const date = new Date();
    const dateData = {
      date: date.getDate().toString(),
      month: months[date.getMonth()],
      year: date.getFullYear().toString(),
      weekday: weekdays[date.getDay()],
    };
    setDate(dateData);
  }, []);

  const [todo, setTodo] = useState("");
  const [view, setView] = useState(false);

  useEffect(() => {
    if (todo !== "") {
      const data = {
        text: todo,
      };
      addTodo(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  }, [todo]);

  return (
    <div className="Website">
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
        <Todos />
      </div>
      <form
        className={`inputDialog${view ? "active" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          setTodo(e.target.inputBox.value);
          setView(false);
        }}
      >
        <input className="inputBox" name="inputBox" autoComplete="off"></input>
        <button type="submit" className="inputButton">
          <AiOutlineSend size={30} />
        </button>
      </form>
    </div>
  );
};

export default Todo;
