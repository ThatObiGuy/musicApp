import React, { useState } from 'react';
import axios from '../../axiosConfig';
import './ArtistPage.css';

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const [artistName, setArtistName] = useState('');

  const fetchArtists = async () => {
    const response = await axios.get('/api/artists');
    setArtists(response.data);
  };

  const addArtist = async () => {
    await axios.post('/api/artists', { name: artistName });
    fetchArtists();
  };

  return (
    <div className="artists-container">
      <h1>Artists</h1>

      <input
        type="text"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        placeholder="Artist Name"
      />

      <button onClick={addArtist}>Add Artist</button>

      <div>
        {artists.map((artist) => (
          <div key={artist.id}>{artist.name}</div>
        ))}
      </div>
      
    </div>
  );
};

export default ArtistPage;