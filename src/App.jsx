import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const FighterCard = ({ name, image, description }) => {
  return (
    <div className="fighter-card">
      <img src={image} alt={`${name} image`} className="fighter-image" />
      <h2 className="fighter-name">{name}</h2>
      <p className="fighter-description">{description}</p>
    </div>
  );
};
const App = () => {
  return (
    <div className="App">
      <FighterCard
        name="Conor McGregor"
        img="https://www.mensjournal.com/.image/t_share/MTk2MTM2OTI5NTk5NjkzOTY5/main2-conor.jpg"
        description="Irish mixed martial artist and former UFC champion."
      />
    </div>
  );
};

export default App;
