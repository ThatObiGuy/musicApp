import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArtistPage from './pages/Artist/ArtistPage';
import SongsPage from './pages/Songs/SongsPage';
import AlbumsPage from './pages/Albums/AlbumsPage';

const App = () => { // App component
  return (
    <Router> {/* Router component wraps the entire application to enable routing */}
      <Routes> {/* Routes component contains all the Route definitions */}
        <Route path="/" element={<HomePage />} /> {/* Specifying routes for the different pages */}
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
      </Routes>
    </Router>
  );
};

export default App; // called in index.js