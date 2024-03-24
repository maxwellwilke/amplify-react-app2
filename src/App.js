import './App.css';
import React, { useState, useEffect } from 'react';
// Source: https://docs.amplify.aws/react/build-a-backend/restapi/fetch-data/
import { get } from 'aws-amplify/api';

const App = () => {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);

  // Define function to all API
  const fetchCoins = async() => {
    //Get request with latest Amplify
    const restOperation = await get({
      apiName: "cryptoapi2",
      path: "/coins"
    });
    // Source: https://docs.amplify.aws/react/build-a-backend/restapi/fetch-data/#accessing-response-payload
    const { body } = await restOperation.response;
    const json = await body.json();
    updateCoins(json.coins);
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App
