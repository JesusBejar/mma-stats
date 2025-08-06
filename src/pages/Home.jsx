import fighter from "../api/fighter";
import React, { useState } from "react";
import FighterCard from "../components/FighterCard";

const Home = () => {
  const [fighterName, setFighterName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const API_KEY = "9fa47c65e6msh6013516bc42c8bbp177bd0jsnfe677f674a14";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (fighterName.trim()) {
      const result = await fighter.getFighterByName(fighterName, API_KEY);      
      if (result && result !== "undefined") {
        try {
          const parsedResult = JSON.parse(result);
          setSearchResults(parsedResult);
        } catch (parseError) {
          console.error("error parsing data:", parseError);
          console.error("raw response:", result);
          setSearchResults([]);
        }
      } else {
        console.error("no data received from API");
        setSearchResults([]);
      }
    }
  };

  return (
    <div>
      <h1>MMA Stats</h1>
      <p>find by:</p>
      <ul>
        <form onSubmit={handleSearch}>
          <li>
            <button type="button">Fighter Name</button>
            <input
              type="text"
              placeholder="Enter fighter name"
              value={fighterName}
              onChange={(e) => setFighterName(e.target.value)}
            />
          </li>
          {/* <li>
            <button type="button">UFC #</button>
            <input type="text" placeholder="Enter UFC #" />
          </li> */}
          <li>
            <button type="submit">Search</button>
          </li>
        </form>
      </ul>
      
      <div className="search-results">
        {searchResults.map((fighterData, index) => (
          <FighterCard 
            key={index}
            name={fighterData.Name} 
            nickname={fighterData.Nickname} 
            division={fighterData["Division Title"]} 
            divisionBody={`${fighterData["Division Body"].Wins}W-${fighterData["Division Body"].Losses}L-${fighterData["Division Body"].Draws}D`}
            hometown={fighterData["Fighter Bio"].Hometown} 
            height={`Height ${fighterData["Fighter Bio"].Height}`} 
            weight={`Weight ${fighterData["Fighter Bio"].Weight}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
