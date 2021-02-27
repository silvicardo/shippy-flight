import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { SWRConfig } from "swr";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
// Alter defaults after instance has been created
axiosInstance.defaults.headers.common["Authorization"] = `Bearer 1 ${process.env.REACT_APP_AUTH_TOKEN}`;

export const axiosGetFecther = (url: string) => axiosInstance.get(url).then((res) => res.data);

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: axiosGetFecther,
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
