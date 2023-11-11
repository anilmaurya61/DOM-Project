const accessToken = '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'; 
const username = 'anilmaurya61'; 

const apiUrl = `https://api.github.com/users/${username}`;

// Set up the headers with the access token
const headers = {
  Authorization: `Bearer ${accessToken}`,
  Accept: 'application/json',
};

// Make the request using fetch
fetch(apiUrl, { headers })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch user. Status code: ${response.status}`);
    }
    return response.json();
  })
  .then(user => {
    console.log(JSON.stringify(user,null,2));
    console.log(`User found: ${user}`);
    // Process user data as needed
  })
  .catch(error => {
    console.error(error.message);
  });
