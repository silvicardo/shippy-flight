import "./css/App.css";
import RouteSearchForm from "./components/RouteSearchForm";
import AirportSelect from "./components/AirportSelect";
import React from "react";
import RouteSearchResult from "./components/RouteSearchResult";
import SearchingRoute from "./components/SearchingRoute";

function App() {
  return (
    <div className="App">
      <RouteSearchForm>
        <AirportSelect name={"departure"} label={"Partenza:"} />
        <AirportSelect name={"arrival"} label={"Arrivo:"} />
      </RouteSearchForm>
      <SearchingRoute />
      <RouteSearchResult />
    </div>
  );
}

export default App;
