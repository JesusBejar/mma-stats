const getUFCYear = async (year, API_KEY) => {
  const url = `https://mma-stats.p.rapidapi.com/fights_by_year?year=${year}&month=`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'mma-stats.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
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
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {
  getUFCYear,
  getFighterByName,
};
