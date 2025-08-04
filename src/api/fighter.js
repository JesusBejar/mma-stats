const getUFCEvent = async (API_KEY) => {
  const url = "https://mma-stats.p.rapidapi.com/fights_by_year?year=2024";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "mma-stats.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const getFighterByName = async (name, API_KEY) => {
  const url = `https://mma-stats.p.rapidapi.com/search?name=${name}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "mma-stats.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export default {
  getUFCEvent,
  getFighterByName,
};
