import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import './AlbumsPage.css';

const AlbumsPage = () => {

  // declaring react objects
  const [albumsArray, setAlbumsArray] = useState([]); // Array of albums
  const [albumName, setAlbumName] = useState(''); // Input field for album name - useState('') sets the initial value
  const [artistId, setArtistId] = useState(''); // Input field for artist ID
  const [releaseYear, setReleaseYear] = useState(''); // Input field for release year
  const [numberOfListens, setNumberOfListens] = useState(''); // Input field for number of listens
  const [songs, setSongs] = useState(''); // Input field for songs
  const [retrievedAlbum, setRetrievedAlbum] = useState(null); // Retrieved album object
  const [isCreating, setIsCreating] = useState(false); // states for different operations
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [serverMessage, setServerMessage] = useState(''); // New state variable for server messages

  useEffect(() => { // useEffect means as soon as the component is loaded, we fetch the albums
    fetchAlbums();
  }, []);

  const fetchAlbums = () => { // Function to fetch albums from the server
    axios.get('/api/albums') // Send a GET request to the server
    .then((response) => { 
      setAlbumsArray(response.data); // Set the albums array to the response data
    })
    .catch((error) => {
      console.error('Error fetching albums:', error);
    });
  };

  const addAlbum = () => { // Function to add an album - called on create button press
    const newAlbum = { // Create a new album object
      name: albumName, // aligning vars with the backend controller
      artistId: artistId, // they get their values from the input fields
      releaseYear: releaseYear,
      numberOfListens: numberOfListens,
      songs: songs,
    };

    axios.post('/api/albums', newAlbum) // Send a POST request to the server - it'll be received by controller
    .then(() => {
      fetchAlbums(); // Refresh the list of albums
      setServerMessage('Album added successfully'); // Set server message
    })
    .catch((error) => {
      console.error('Error adding album:', error);
      setServerMessage('Error adding album'); // Set server message
    });
  };


  const updateAlbum = () => {
    if (retrievedAlbum) { // If we have a retrieved album
      const updatedAlbum = {
      name: albumName,
      artistId: artistId,
      releaseYear: releaseYear,
      numberOfListens: numberOfListens,
      songs: songs,
      };

      axios.put(`/api/albums/${retrievedAlbum.AlbumID}`, updatedAlbum)
      .then(() => {
        fetchAlbums(); // Refresh the list of albums
        setServerMessage('Album updated successfully - retrieve again'); // Set server message
      })
      .catch((error) => {
        console.error('Error updating album:', error);
        setServerMessage('Error updating album'); // Set server message
      });
    }
  };


  const deleteAlbum = () => {
    if (retrievedAlbum) { // If we have a retrieved album
      axios.delete(`/api/albums/${retrievedAlbum.AlbumID}`)
      .then(() => {
        fetchAlbums(); // Refresh the list of albums
        // Clear the input fields
        setAlbumName('');
        setArtistId('');
        setReleaseYear('');
        setNumberOfListens('');
        setSongs('');
        setRetrievedAlbum(null);
        setIsDeleting(false);
        setServerMessage('Album deleted successfully'); // Set server message
      })
      .catch((error) => {
        console.error('Error deleting album:', error);
        setServerMessage('Error deleting album'); // Set server message
      });
    }
  };

  const retrieveAlbum = () => { // Function to retrieve an album by name
    const album = albumsArray.find((a) => a.AlbumName === albumName); // Find the album by name
    if (album) { // If we found the album
      setAlbumName(album.AlbumName); // Set the input fields to the album's values
      setArtistId(album.ArtistID);
      setReleaseYear(album.ReleaseYear);
      setNumberOfListens(album.NumberOfListens);
      setSongs(album.Songs);
      setRetrievedAlbum(album); // Set the retrieved album
      setServerMessage('Album retrieved successfully'); // Set server message
    } else {
      setServerMessage('Album not found'); // Set server message
    }
  };


  return (

    <div className="albumsBigBox">
      <h1>Albums</h1>

      <div className="CRUDOperationContainer"> {/* middle section */}

        <div className="CRUDSidebar"> {/* sidebar for buttons */}
          <button id="create" onClick={() => { setIsCreating(true); setIsRetrieving(false); setIsDeleting(false); setIsUpdating(false); setServerMessage(''); }}>Create</button>
          <div className="CRUDRetrieves"> {/* update and delete follow retrieve */}
            <button id="retrieve" onClick={() => { setIsRetrieving(true); setIsCreating(false); setIsDeleting(false); setIsUpdating(false); setServerMessage(''); }}>Retrieve</button>
            <button id="update" onClick={() => { setIsUpdating(true); setIsCreating(false); setIsRetrieving(false); setIsDeleting(false); setServerMessage(''); }}>Update</button>
            <button id="delete" onClick={() => { setIsDeleting(true); setIsCreating(false); setIsRetrieving(false); setIsUpdating(false); setServerMessage(''); }}>Delete</button>
          </div>
        </div>

        <div className="OperationOutput" style={{ backgroundColor: isCreating ? 'green' : isRetrieving ? 'yellow' : isDeleting ? 'red' : isUpdating ? 'cornflowerblue' : 'white' }}>
          {/* This is our output panel, background colour == current operation*/}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* We split the output panel into two halves */}
            {/* This will be the operations half*/}
              <div style={{ width: '50%' }}>

                {isCreating && ( 
                  <div> {/* If user is currently creating we show this div */}
                    <input
                    type="text"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    placeholder="Enter Album Name"
                    />{/* Relevant fields for operation */}
                    <input
                    type="text"
                    value={artistId}
                    onChange={(e) => setArtistId(e.target.value)}
                    placeholder="Enter Artist ID"
                    />
                    <input
                    type="text"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    placeholder="Enter Release Year"
                    />
                    <input
                    type="text"
                    value={numberOfListens}
                    onChange={(e) => setNumberOfListens(e.target.value)}
                    placeholder="Enter Number of Listens"
                    />
                    <input
                    type="text"
                    value={songs}
                    onChange={(e) => setSongs(e.target.value)}
                    placeholder="Enter Songs"
                    />
                    <button onClick={addAlbum}>Save</button>
                  </div>
                )}


                {isRetrieving && (
                  <div> {/* If user is currently retrieving we show this div */}
                    <input
                    type="text"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    placeholder="Enter Album Name"
                    />
                    <button onClick={retrieveAlbum}>Retrieve Album</button>
                  </div>
                )}


                {retrievedAlbum && (
                  <pre>{JSON.stringify(retrievedAlbum, null, 2)}</pre>
                )}


                {isDeleting && (
                  <div> {/* If user is currently deleting we show this div */}
                    <button onClick={deleteAlbum}>Confirm</button>
                  </div>
                )}


                {isUpdating && (
                  <div> {/* If user is currently updating we show this div */}
                    <input
                    type="text"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    placeholder="Enter Album Name"
                    />
                    <input
                    type="text"
                    value={artistId}
                    onChange={(e) => setArtistId(e.target.value)}
                    placeholder="Enter Artist ID"
                    />
                    <input
                    type="text"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    placeholder="Enter Release Year"
                    />
                    <input
                    type="text"
                    value={numberOfListens}
                    onChange={(e) => setNumberOfListens(e.target.value)}
                    placeholder="Enter Number of Listens"
                    />
                    <input
                    type="text"
                    value={songs}
                    onChange={(e) => setSongs(e.target.value)}
                    placeholder="Enter Songs"
                    />
                    <button onClick={updateAlbum}>Update</button>
                  </div>
                )}
              </div>

              {/* This will be the server message div */}
              <div className="ServerResponse">
                <h3>Server Messages</h3>
                <p>{serverMessage}</p>
              </div>

            </div>
      </div>
    </div>

    <div className="albumsList">
      <h2>Albums List</h2>
      <ul>
        {albumsArray.map((album) => (<li key={album.AlbumID}>{album.AlbumName}</li>))}
      </ul>
    </div>

    </div>
  );
};

export default AlbumsPage;