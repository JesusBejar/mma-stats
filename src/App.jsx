import { Component, useState } from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import FightCard from "./components/FighterCard";
import "./App.css";

const App = () => {
  let component;
  switch (window.location.pathname) {
    case "/":
      document.title = "Home";
      component = <Home />;
      break;
    case "/savedFighters":
      document.title = "Saved Fighters";
      component = <SavedFighters />;
      break;
      case "/savedFights":
        document.title = "Saved Fights";
        component = <SavedFights />;
        break;
    default:
      document.title = "MMA Stats";
  }
  return (
    <>
      <NavBar />
      <div>{component}</div>
    </>
  );
};

export default App;
