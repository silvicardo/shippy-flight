import "./css/App.css";
import React from "react";
import AllFlightsPage from "./components/Pages/AllFlightsPage";
import { Redirect, Route } from "react-router";
import Navbar from "./components/Navbar";
import SearchRoutePage from "./components/Pages/SearchRoutePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path={"/route-search"}>
        <SearchRoutePage />
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
