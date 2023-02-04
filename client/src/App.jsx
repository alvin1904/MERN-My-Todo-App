import "./App.css";
import Home from "./components/Home";
import Todo from "./components/Todo";
import * as React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AppProvider } from "./components/context";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/todopage"
          element={
            <AppProvider>
              <Todo />
            </AppProvider>
          }
        />
        {/* 
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
