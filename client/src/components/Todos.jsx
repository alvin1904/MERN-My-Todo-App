import { useEffect } from "react";
import { useState } from "react";
import { BsCircle, BsCheck2Circle, BsTrash } from "react-icons/bs";
import { getTodos } from "../api/index";
import { deleteTodo, completeTodo } from "../api/index";

const Todos = ({ todo }) => {
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState(false);
  const [deletes, setDeletes] = useState("");
  let delayforEach = 0;

  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, [todo, update]);

  const handleDelete = (id) => {
    if (id) {
      deleteTodo(id)
        .then((res) => {
          // console.log(res);

          setUpdate(!update);
          setDeletes("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleToggleCompletion = (id) => {
    if (id) {
      completeTodo(id)
        .then((res) => {
          // console.log(res);
          setUpdate(!update);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="todos">
      {todos.map(({ _id, text, complete }) => {
        const delay = 600 / todos.length;
        delayforEach += delay;
        return (
          <div
            className={`todo ${complete ? "completed" : ""} `}
            key={_id}
            style={{
              animationDelay: `${delayforEach}ms`,
              opacity: 0,
            }}
          >
            <div className={`message `}>{text}</div>
            <div className="tickbox">
              <div
                onClick={() => {
                  handleToggleCompletion(_id);
                }}
              >
                {complete ? (
                  <span className="green">
                    <BsCheck2Circle size={25} />
                  </span>
                ) : (
                  <span className="black">
                    <BsCircle size={25} />
                  </span>
                )}
              </div>

              <span
                className="red"
                onClick={() => {
                  handleDelete(_id);
                }}
              >
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
