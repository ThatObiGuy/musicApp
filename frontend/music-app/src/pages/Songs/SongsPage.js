import React, { useState } from 'react';
import axios from '../../axiosConfig';
import './SongsPage.css';

const SongsPage = () => { 
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState('');

  const fetchSongs = async () => {
    const response = await axios.get('/api/songs');
    setSongs(response.data);
  };

  const addSong = async () => {
    await axios.post('/api/songs', { name: songName });
    fetchSongs();
  };


  return (
    <div className="songs-container">
      <h1>Songs</h1>

      <input
        type="text"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        placeholder="Song Name"
      />

      <button onClick={addSong}>Add Song</button>

      <div>
        {songs.map((song) => (
          <div key={song.id}>{song.name}</div>
        ))}
      </div>

    </div>
  );
};

export default SongsPage;