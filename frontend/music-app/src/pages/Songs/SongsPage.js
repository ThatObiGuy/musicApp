import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import './SongsPage.css';

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState('');
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [retrievedSong, setRetrievedSong] = useState(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('/api/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const addSong = async () => {
    try {
      await axios.post('/api/songs', { name: songName });
      fetchSongs();
    } catch (error) {
      console.error('Error adding song:', error);
    }
  };

  const updateSong = async () => {
    if (selectedSongId) {
      try {
        await axios.put(`/api/songs/${selectedSongId}`, { name: songName });
        fetchSongs();
      } catch (error) {
        console.error('Error updating song:', error);
      }
    }
  };

  const deleteSong = async () => {
    if (selectedSongId) {
      try {
        await axios.delete(`/api/songs/${selectedSongId}`);
        fetchSongs();
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
  };

  const retrieveSong = () => {
    const song = songs.find((s) => s.SongName.toLowerCase() === songName.toLowerCase());
    setRetrievedSong(song);
  };

  return (
    <div className="songsTitle">
      <h1>Songs</h1>
      <input
        type="text"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        placeholder="Song Name"
      />

      <div className="CRUDOperationContainer">
        <div className="CRUDSidebar">
          <button id="create" onClick={addSong}>Create</button>
          <button id="retrieve" onClick={retrieveSong}>Retrieve</button>
          <button id="update" onClick={updateSong}>Update</button>
          <button id="delete" onClick={deleteSong}>Delete</button>
        </div>

        <div className="OperationOutput">
          <p>Selected Song ID: {selectedSongId}</p>
          {retrievedSong && (
            <pre>{JSON.stringify(retrievedSong, null, 2)}</pre>
          )}
        </div>
      </div>

      <div className="songsList">
        <h2>Songs List</h2>
        <ul>
          {songs.map((song) => (
            <li key={song.SongID}>{song.SongName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SongsPage;