import React, { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';

const GithubUserData = () => {
  
  const [githubuser, updateGithubUser] = useState([]);

  // Define function to all API
  const fetchGithubUser = async() => {
    //Get request with latest Amplify
    const restOperation = await get({
      apiName: "githubapi",
      path: "/githubuser"
    });
    const { body } = await restOperation.response;
    const json = await body.json();
    updateGithubUser(json.githubuser);
  }

  useEffect(() => {
    fetchGithubUser()
  }, [])

  return (
    <div>
      <div>{githubuser.name} joined GitHub on: {githubuser.created_at}</div>
    </div>
  );
}

export default GithubUserData
