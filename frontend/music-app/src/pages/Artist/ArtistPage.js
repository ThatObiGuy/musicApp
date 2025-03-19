import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import './ArtistPage.css';

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    const response = await axios.get('/api/artists');
    setArtists(response.data);
  };

  const addArtist = async () => {
    await axios.post('/api/artists', { name: artistName });
    fetchArtists();
  };

  const updateArtist = async () => {
    if (selectedArtistId) {
      await axios.put(`/api/artists/${selectedArtistId}`, { name: artistName });
      fetchArtists();
    }
  };

  const deleteArtist = async () => {
    if (selectedArtistId) {
      await axios.delete(`/api/artists/${selectedArtistId}`);
      fetchArtists();
    }
  };

  return (
    <div className="artistsTitle">
      <h1>Artists</h1>
      <input
        type="text"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        placeholder="Artist Name"
      />
      <div className="CRUDOperationContainer">
        <div className="CRUDSidebar">
          <button id="create" onClick={addArtist}>Create</button>
          <button id="retrieve" onClick={fetchArtists}>Retrieve</button>
          <button id="update" onClick={updateArtist}>Update</button>
          <button id="delete" onClick={deleteArtist}>Delete</button>
        </div>
        <div className="OperationOutput">
          <p>Selected Artist ID: {selectedArtistId}</p>
          {artists.map((artist) => (
            <div key={artist.id} onClick={() => setSelectedArtistId(artist.id)}>
              {artist.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;