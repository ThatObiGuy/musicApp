import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import './AlbumsPage.css';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [albumName, setAlbumName] = useState('');
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const response = await axios.get('/api/albums');
    setAlbums(response.data);
  };

  const addAlbum = async () => {
    await axios.post('/api/albums', { name: albumName });
    fetchAlbums();
  };

  const updateAlbum = async () => {
    if (selectedAlbumId) {
      await axios.put(`/api/albums/${selectedAlbumId}`, { name: albumName });
      fetchAlbums();
    }
  };

  const deleteAlbum = async () => {
    if (selectedAlbumId) {
      await axios.delete(`/api/albums/${selectedAlbumId}`);
      fetchAlbums();
    }
  };

  return (
    <div className="albumTitle">
      <h1>Albums</h1>
      <input
        type="text"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
        placeholder="Album Name"
      />
      <div className="CRUDOperationContainer">
        <div className="CRUDSidebar">
          <button id="create" onClick={addAlbum}>Create</button>
          <button id="retrieve" onClick={fetchAlbums}>Retrieve</button>
          <button id="update" onClick={updateAlbum}>Update</button>
          <button id="delete" onClick={deleteAlbum}>Delete</button>
        </div>
        <div className="OperationOutput">
          <p>Selected Album ID: {selectedAlbumId}</p>
          {albums.map((album) => (
            <div key={album.id} onClick={() => setSelectedAlbumId(album.id)}>
              {album.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumsPage;