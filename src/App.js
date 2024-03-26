import './App.css';
import React, { useState, useEffect } from 'react';
// Source: https://docs.amplify.aws/react/build-a-backend/restapi/fetch-data/
import { get } from 'aws-amplify/api';
import GithubUserData from './GithubUserData';

const App = () => {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  const [loading, updateloading] = useState(true);

  // Create a new function to allow users to update the input values
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  // Define function to all API
  const fetchCoins = async() => {
    updateloading(true);
    const { limit, start } = input;
    // Get request with latest Amplify
    const restOperation = await get({
      apiName: "cryptoapi2",
      path: "/coins",
      options: { // https://docs.amplify.aws/react/build-a-backend/restapi/fetch-data/#accessing-query-parameters--body-in-lambda-proxy-function
        queryParams: {
          limit: limit, 
          start: start
        }
      }
    });
    // Source: https://docs.amplify.aws/react/build-a-backend/restapi/fetch-data/#accessing-response-payload
    const { body } = await restOperation.response;
    const json = await body.json();
    updateCoins(json.coins);
    updateloading(false);
  }

  // Call fetchCoins function when component loads
  useEffect(() => { 
    fetchCoins()
  }, [])

  return (
    <div className="App">
      
      <input
        placeholder="start"
        onChange={e => updateInputValues('start', e.target.value)}
      />
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit"
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
      {loading && <h2>Loading...</h2>}
      {
        !loading && coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
      <GithubUserData />
    </div>
  );
}

export default App
