// This file is used to create an instance of axios with a base URL for the backend server.
// This instance can be imported and used in other files to make HTTP requests to the backend server.
import axios from 'axios';

const instance = axios.create({ // Create an instance of axios
  baseURL: 'http://localhost:5000', // We've set the port to 5000 in the backend server
});

export default instance; // When we import this file, we get the instance of axios, relevant for the 3 main pages.