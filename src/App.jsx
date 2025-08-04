import { Component, useState } from "react";
import Home from "./pages/Home";
import "./App.css";
import NavBar from "./components/NavBar";

const App = () => {
  let Component;
  switch (window.location.pathname) {
    case "/home":
      document.title = "Home";
      Component = Home;
      break;
    case "/fighters":
      document.title = "Fighters";
      Component = FightCard;
      break;
    case "/events":
      document.title = "UFC Events";
      Component = UFCCard;
      break;
    default:
      document.title = "MMA Stats";
  }
  return (
    <>
      <NavBar />
      <Component />
    </>
  );
};

export default App;
