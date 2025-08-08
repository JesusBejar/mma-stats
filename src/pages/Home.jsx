import fighter from "../api/fighter";
import React, { useState } from "react";
import FighterCard from "../components/FighterCard";
import UFCCard from "../components/UFCCard";

const Home = () => {
  const [fighterName, setFighterName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [ufcNumber, setUfcNumber] = useState("");
  const [ufcResults, setUfcResults] = useState([]);
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

  const handleUFCSearch = async (e) => {
    e.preventDefault();
    if (ufcNumber.trim()) {
      const result = await fighter.getUFCEvent(ufcNumber, API_KEY);      
      if (result && result !== "undefined") {
        try {
          const parsedResult = JSON.parse(result);
          setUfcResults([parsedResult]); // Wrap in array since it's a single event
        } catch (parseError) {
          console.error("error parsing UFC data:", parseError);
          console.error("raw response:", result);
          setUfcResults([]);
        }
      } else {
        console.error("no UFC data received from API");
        setUfcResults([]);
      }
    }
  };

  return (
    <div className="home-container">
      <h1>MMA Stats</h1>
      <p className="p-description">Find your favorite fighters and their stats!</p>
      
      <form className="search-form" onSubmit={handleSearch}>
        <ul>
          <li>
            <button type="button">Fighter Name</button>
            <input
              type="text"
              placeholder="Enter fighter name"
              value={fighterName}
              onChange={(e) => setFighterName(e.target.value)}
            />
          </li>
          <li>
            <button type="submit">Search</button>
          </li>
        </ul>
      </form>

      <form className="search-form" onSubmit={handleUFCSearch}>
        <ul>
          <li>
            <button type="button">UFC #</button>
            <input
              type="text"
              placeholder="Enter UFC event number"
              value={ufcNumber}
              onChange={(e) => setUfcNumber(e.target.value)}
            />
          </li>
          <li>
            <button type="submit">Search</button>
          </li>
        </ul>
      </form>
      
      <div className="search-results">
        {searchResults.map((fighterData, index) => (
          <FighterCard 
            key={index}
            img={fighterData["Image Link"]}
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
