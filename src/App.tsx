import "./css/App.css";
import React from "react";
import AllFlightsPage from "./components/Pages/AllFlightsPage";
import { Redirect, Route } from "react-router";
import Navbar from "./components/Navbar";
import SearchPage from "./components/Pages/SearchPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path={"/search"}>
        <SearchPage />
      </Route>
      <Route exact path={"/"}>
        <AllFlightsPage />
      </Route>
      <Route path={"*"}>
        <Redirect to="/" />
      </Route>
    </div>
  );
}

export default App;
