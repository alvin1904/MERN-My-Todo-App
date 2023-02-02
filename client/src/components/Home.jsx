import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <button
        className="btn"
        onClick={() => {
          navigate("/todopage");
        }}
      >
        Click to go there
      </button>
    </div>
  );
};

export default Home;
