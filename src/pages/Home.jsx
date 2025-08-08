import fighter from "../api/fighter";
import React, { useState } from "react";
import FighterCard from "../components/FighterCard";
import YearCard from "../components/YearCard";

const Home = () => {
  const [searchType, setSearchType] = useState("fighter"); // name or year
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [yearResults, setYearResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = "9fa47c65e6msh6013516bc42c8bbp177bd0jsnfe677f674a14";

  const handleSearch = async (e) => {
    e.preventDefault();
    
    setErrorMessage("");
    setSearchResults([]);
    setYearResults([]);

    if (searchType === "fighter") {
      const result = await fighter.getFighterByName(searchValue, API_KEY);      
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
    } else if (searchType === "year") {
      const result = await fighter.getUFCYear(searchValue, API_KEY);      
      if (result && result !== "undefined") {
        try {
          const parsedResult = JSON.parse(result);
          setYearResults(Array.isArray(parsedResult) ? parsedResult : [parsedResult]);
        } catch (parseError) {
          console.error("error parsing year data:", parseError);
          console.error("raw response:", result);
          setYearResults([]);
        }
      } else {
        console.error("no year data received from API");
        setYearResults([]);
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

             <form className="search-form" onSubmit={handleYearSearch}>
         <ul>
           <li>
             <button type="button">Year</button>
             <input
               type="text"
               placeholder="Enter year (e.g., 2024)"
               value={year}
               onChange={(e) => setYear(e.target.value)}
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

             <div className="year-results">
         {yearResults.map((eventDate) =>
           Object.entries(eventDate).map(([date, fights]) =>
             fights.map((fight, fightIndex) => (
               <YearCard 
                 key={`${date}-${fightIndex}`}
                 fighter1={fight.matchup[0]}
                 fighter2={fight.matchup[1]}
                 date={date.replace(/_/g, ' ')}
               />
             ))
           )
         ).flat().flat()}
       </div>
    </div>
  );
};

export default Home;
