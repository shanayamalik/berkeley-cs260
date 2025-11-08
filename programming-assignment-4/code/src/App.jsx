import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Task1 from "./task1/Task1";
import Task2 from "./task2/Task2";
import Task3 from "./task3/Task3";
import Task4 from "./task4/Task4";

function Nav() {
  return (
    <>
      <h1>Programming Assignment: Speedy Smarts</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/task1">Task 1</Link>
        </li>
        <li className="list-group-item">
          <Link to="/task2">Task 2</Link>
        </li>
        <li className="list-group-item">
          <Link to="/task3">Task 3</Link>
        </li>
        <li className="list-group-item">
          <Link to="/task4">Task 4</Link>
        </li>
      </ul>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Routes>
              <Route path="/" element={<Nav />} />
              <Route path="/task1" element={<Task1 />} />
              <Route path="/task2/*" element={<Task2 />} />
              <Route path="/task3" element={<Task3 />} />
              <Route path="/task4" element={<Task4 />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
