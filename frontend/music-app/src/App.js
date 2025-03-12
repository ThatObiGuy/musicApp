import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArtistPage from './pages/Artist/ArtistPage';
import SongsPage from './pages/Songs/SongsPage';
import AlbumsPage from './pages/Albums/AlbumsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
      </Routes>
    </Router>
  );
};

export default App;