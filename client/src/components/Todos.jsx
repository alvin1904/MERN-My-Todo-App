import { useEffect } from "react";
import { useState } from "react";
import { BsCircle, BsCheck2Circle, BsTrash } from "react-icons/bs";
import { getTodos } from "../api/index";
import { deleteTodo, completeTodo } from "../api/index";
import { useErrorContext } from "./context";

const Todos = ({ todo }) => {
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState(false);
  let delayforEach = 0;

  const { hideLoading, showLoading, showError } = useErrorContext();

  useEffect(() => {
    showLoading();
    if (todos.length !== 0) hideLoading();
  }, []);
  useEffect(() => {
    showLoading();
    getTodos()
      .then((res) => {
        setTodos(res.data);
        if (todos != res.data) hideLoading();
      })
      .catch((err) => {
        showError(err);
      });
    showLoading();
  }, [todo, update]);

  const handleDelete = (id) => {
    if (id) {
      showLoading();
      deleteTodo(id)
        .then((res) => {
          // console.log(res);
          setUpdate(!update);
          setDeletes("");
        })
        .catch((err) => {
          showError(err);
        });
    }
  };

  const handleToggleCompletion = (id) => {
    if (id) {
      showLoading();
      completeTodo(id)
        .then((res) => {
          // console.log(res);
          setUpdate(!update);
        })
        .catch((err) => {
          showError(err);
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
