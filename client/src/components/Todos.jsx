import { useEffect } from "react";
import { useState } from "react";
import { BsCircle, BsCheck2Circle, BsTrash } from "react-icons/bs";
import { getTodos } from "../api/index";

const Todos = ({ todo }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [todo]);

  return (
    <div className="todos">
      {todos.map(({ _id, text, complete }) => {
        return (
          <div className="todo" key={_id}>
            <div className="message">{text}</div>
            <div className="tickbox">
              {complete ? (
                <span className="green">
                  <BsCheck2Circle size={25} />
                </span>
              ) : (
                <span className="black">
                  <BsCircle size={25} />
                </span>
              )}
              <span className="red">
                <BsTrash size={25} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
