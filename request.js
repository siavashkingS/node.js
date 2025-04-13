const axios = require('axios');

async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log("name: ",response.data[0].name);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchPosts();