import fighter from "../api/fighter";
import React, { useState, useEffect } from "react";
import FighterCard from "../components/FighterCard";
import YearCard from "../components/YearCard";
import { checkTables } from "../services/setup";

const Home = () => {
  const [searchType, setSearchType] = useState("fighter");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [yearResults, setYearResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = "9fa47c65e6msh6013516bc42c8bbp177bd0jsnfe677f674a14";

  useEffect(() => {
    // call if-check on database
    checkTables();
  }, []);

  const validateInput = (value, type) => {
    if (!value || !value.trim()) {
      return `Enter a ${type} to search for`;
    }

    if (type === "fighter") {
      if (value.trim().length < 2) {
        return "Name must be at least 2 characters long";
      }
    }

    if (type === "year") {
      const yearNum = parseInt(value.trim());
      const currentYear = new Date().getFullYear();
      
      if (isNaN(yearNum)) {
        return "Year must be a valid #";
      }
      if (yearNum < 1993) {
        return "UFC started in 1993, enter a year from 1993 onwards";
      }
      if (yearNum > currentYear) {
        return `Year cannot be in the future, enter a year up to ${currentYear}`;
      }
      if (value.trim().length !== 4) {
        return "Enter a 4-digit year";
      }
    }

    return null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    setErrorMessage("");
    setSearchResults([]);
    setYearResults([]);

    // Validate input
    const validationError = validateInput(searchValue, searchType);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsLoading(true);
    try {
      if (searchType === "fighter") {
        const result = await fighter.getFighterByName(searchValue.trim(), API_KEY);
        
        if (!result || result === "undefined") {
          const errorMsg = `No fighter found with the name "${searchValue.trim()}"`;
          setErrorMessage(errorMsg);
          return;
        }

        try {
          const parsedResult = JSON.parse(result);
          if (Array.isArray(parsedResult) && parsedResult.length === 0) {
            const errorMsg = `No results found for name "${searchValue.trim()}"`;
            setErrorMessage(errorMsg);
            return;
          }
          
          setSearchResults(parsedResult);
          
        } catch (parseError) {
          const errorMsg = "Failed to process fighter data from server";
          setErrorMessage(errorMsg);
        }

      } else if (searchType === "year") {
        const result = await fighter.getUFCYear(searchValue.trim(), API_KEY);
        
        if (!result || result === "undefined") {
          const errorMsg = `No UFC events found for the year ${searchValue.trim()}`;
          setErrorMessage(errorMsg);
          return;
        }

        try {
          const parsedResult = JSON.parse(result);
          const processedResults = Array.isArray(parsedResult) ? parsedResult : [parsedResult];
          
          const hasEvents = processedResults.some(yearData => 
            Object.keys(yearData).length > 0 && 
            Object.values(yearData).some(events => Array.isArray(events) && events.length > 0)
          );

          if (!hasEvents) {
            const errorMsg = `No fights found for the year ${searchValue.trim()}`;
            setErrorMessage(errorMsg);
            return;
          }
          
          setYearResults(processedResults);
          
          let totalFights = 0;
          processedResults.forEach(yearData => {
            Object.values(yearData).forEach(events => {
              if (Array.isArray(events)) totalFights += events.length;
            });
          });
        } catch (parseError) {
          const errorMsg = "Could not process year data from server";
          setErrorMessage(errorMsg);
        }
      }

    } catch (networkError) {
      const errorMsg = "Network error, check your internet connection";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>MMA Stats</h1>
      <p className="p-description">Find your favorite fighters and their stats!</p>
      
      <form className="search-form" onSubmit={handleSearch}>
        <ul>
          <li>
            <div className="search-toggle">
              <button 
                type="button" 
                className={searchType === "fighter" ? "active" : ""}
                onClick={() => {
                  setSearchType("fighter");
                  setSearchValue("");
                }}
              >
                Fighter Name
              </button>
              <button 
                type="button" 
                className={searchType === "year" ? "active" : ""}
                onClick={() => {
                  setSearchType("year");
                  setSearchValue("");
                }}
              >
                Year
              </button>
            </div>
          </li>
          <li>
            <input
              type="text"
              placeholder={searchType === "fighter" ? "Enter fighter name" : "Enter year (e.g., 2024)"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </button>
          </li>
        </ul>
      </form>

      {errorMessage && (
        <div className="error-message">
          <p>⚠️ {errorMessage}</p>
        </div>
      )}

      {isLoading && (
        <div className="loading-message">
          <p>Searching for {searchType === "fighter" ? "fighter" : "events"}...</p>
        </div>
      )}
      
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
            height={`Height ${fighterData["Fighter Bio"].Height} in`} 
            weight={`Weight ${fighterData["Fighter Bio"].Weight} lbs`} 
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
