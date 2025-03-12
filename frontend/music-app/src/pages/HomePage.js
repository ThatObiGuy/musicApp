import React from 'react'; // Import the React library - allows us to use JSX
import { Link } from 'react-router-dom'; // Import the Link component
import './HomePage.css'; // Import the CSS file

// Define the HomePage component
const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Music Application</h1>
      <Link to="/artists"><button>Artists</button></Link>
      <Link to="/songs"><button>Songs</button></Link>
      <Link to="/albums"><button>Albums</button></Link>
    </div>
  );
};

export default HomePage;