import fighter from "../api/fighter";
import getFighterByName from "../api/fighter";
import React, { useState } from "react";

const Home = () => {
  const [fighterName, setFighterName] = useState("");
  const API_KEY = "9fa47c65e6msh6013516bc42c8bbp177bd0jsnfe677f674a14";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (fighterName.trim()) {
      await fighter.getFighterByName(fighterName, API_KEY);
    }
  };

  return (
    <div>
      <h1>MMA Stats</h1>
      <p>find by:</p>
      <ul>
        <form onSubmit={handleSearch}>
          <li>
            <button>Fighter Name</button>
            <input
              type="text"
              placeholder="Enter fighter name"
              value={fighterName}
              onChange={(e) => setFighterName(e.target.value)}
            />
          </li>
        </form>
        <li>
          <button>UFC #</button>
          <input type="text" placeholder="Enter UFC #" />
        </li>
      </ul>
      <button type="submit">Search</button>
    </div>
  );
};

export default Home;
