import React, { useState } from 'react';
import axios from '../../axiosConfig';
import './AlbumsPage.css';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [albumName, setAlbumName] = useState('');

  const fetchAlbums = async () => {
    const response = await axios.get('/api/albums');
    setAlbums(response.data);
  };

  const addAlbum = async () => {
    await axios.post('/api/albums', { name: albumName });
    fetchAlbums();
  };

  return (
    <div className="albums-container">
      <h1>Albums</h1>

      <input
        type="text"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
        placeholder="Album Name"
      />

      <button onClick={addAlbum}>Add Album</button>

      <div>
        {albums.map((album) => (
          <div key={album.id}>{album.name}</div>
        ))}
      </div>
      
    </div>
  );
};

export default AlbumsPage;