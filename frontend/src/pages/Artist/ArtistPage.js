import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import './ArtistPage.css';

const ArtistPage = () => {

  // declaring react objects
  const [artistsArray, setArtistsArray] = useState([]); // Array of artists
  const [artistName, setArtistName] = useState(''); // Input field for artist name - useState('') sets the initial value
  const [monthlyListeners, setMonthlyListeners] = useState(''); // Input field for monthly listeners
  const [genre, setGenre] = useState(''); // Input field for genre
  const [albums, setAlbums] = useState(''); // Input field for albums
  const [songs, setSongs] = useState(''); // Input field for songs
  const [retrievedArtist, setRetrievedArtist] = useState(null); // Retrieved artist object
  const [isCreating, setIsCreating] = useState(false); // states for different operations
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [serverMessage, setServerMessage] = useState(''); // New state variable for server messages

  useEffect(() => { // useEffect means as soon as the component is loaded, we fetch the artists
    fetchArtists();
  }, []);

  const fetchArtists = () => { // Function to fetch artists from the server
    axios.get('/api/artists') // Send a GET request to the server
    .then((response) => { 
      setArtistsArray(response.data); // Set the artists array to the response data
    })
    .catch((error) => {
      console.error('Error fetching artists:', error);
    });
  };

  const addArtist = () => { // Function to add an artist - called on create button press
    const newArtist = { // Create a new artist object
      name: artistName, // aligning vars with the backend controller
      monthlyListeners: monthlyListeners, // they get their values from the input fields
      genre: genre,
      albums: albums,
      songs: songs,
    };

    axios.post('/api/artists', newArtist) // Send a POST request to the server - it'll be received by controller
    .then(() => {
      fetchArtists(); // Refresh the list of artists
      setServerMessage('Artist added successfully'); // Set server message
    })
    .catch((error) => {
      console.error('Error adding artist:', error);
      setServerMessage('Error adding artist'); // Set server message
    });
  };


  const updateArtist = () => {
      if (retrievedArtist) { // If we have a retrieved artist
          const updatedArtist = {
          name: artistName,
          monthlyListeners: monthlyListeners,
          genre: genre,
          albums: albums,
          songs: songs,
      };

      axios.put(`/api/artists/${retrievedArtist.ArtistID}`, updatedArtist)
      .then(() => {
          fetchArtists(); // Refresh the list of artists
          setServerMessage('Artist updated successfully - retrieve again'); // Set server message
      })
      .catch((error) => {
          console.error('Error updating artist:', error);
          setServerMessage('Error updating artist'); // Set server message
      });
      }
  };


  const deleteArtist = () => {
      if (retrievedArtist) { // If we have a retrieved artist
          axios.delete(`/api/artists/${retrievedArtist.ArtistID}`)
          .then(() => {
              fetchArtists(); // Refresh the list of artists
              // Clear the input fields
              setArtistName('');
              setMonthlyListeners('');
              setGenre('');
              setAlbums('');
              setSongs('');
              setRetrievedArtist(null);
              setIsDeleting(false);
              setServerMessage('Artist deleted successfully'); // Set server message
          })
          .catch((error) => {
              console.error('Error deleting artist:', error);
              setServerMessage('Error deleting artist'); // Set server message
          });
      }
  };

  const retrieveArtist = () => { // Function to retrieve an artist by name
    const artist = artistsArray.find((a) => a.ArtistName === artistName); // Find the artist by name
    if (artist) { // If we found the artist
      setArtistName(artist.ArtistName); // Set the input fields to the artist's values
      setMonthlyListeners(artist.MonthlyListeners);
      setGenre(artist.Genre);
      setAlbums(artist.Albums);
      setSongs(artist.Songs);
      setRetrievedArtist(artist); // Set the retrieved artist
      setServerMessage('Artist retrieved successfully'); // Set server message
    } else {
      setServerMessage('Artist not found'); // Set server message
    }
  };


  return (
    // JSX code
    <div className="artistsBigBox">
      <h1>Artists</h1>

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
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder="Enter Artist Name"
                        />{/* Relevant fields for operation */}
                        <input
                        type="text"
                        value={monthlyListeners}
                        onChange={(e) => setMonthlyListeners(e.target.value)}
                        placeholder="Enter Monthly Listeners"
                        />
                        <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        placeholder="Enter Genre"
                        />
                        <input
                        type="text"
                        value={albums}
                        onChange={(e) => setAlbums(e.target.value)}
                        placeholder="Enter Albums"
                        />
                        <input
                        type="text"
                        value={songs}
                        onChange={(e) => setSongs(e.target.value)}
                        placeholder="Enter Songs"
                        />
                        <button onClick={addArtist}>Save</button>
                    </div>
                )}


                {isRetrieving && (
                  <div> {/* If user is currently retrieving we show this div */}
                      <input
                      type="text"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      placeholder="Enter Artist Name"
                      />
                      <button onClick={retrieveArtist}>Retrieve Artist</button>
                  </div>
                )}


                {retrievedArtist && (
                  <pre>{JSON.stringify(retrievedArtist, null, 2)}</pre>
                )}


                {isDeleting && (
                  <div> {/* If user is currently deleting we show this div */}
                  <button onClick={deleteArtist}>Confirm</button>
                  </div>
                )}


                {isUpdating && (
                  <div> {/* If user is currently updating we show this div */}
                    <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Enter Artist Name"
                    />
                    <input
                    type="text"
                    value={monthlyListeners}
                    onChange={(e) => setMonthlyListeners(e.target.value)}
                    placeholder="Enter Monthly Listeners"
                    />
                    <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Enter Genre"
                    />
                    <input
                    type="text"
                    value={albums}
                    onChange={(e) => setAlbums(e.target.value)}
                    placeholder="Enter Albums"
                    />
                    <input
                    type="text"
                    value={songs}
                    onChange={(e) => setSongs(e.target.value)}
                    placeholder="Enter Songs"
                    />
                    <button onClick={updateArtist}>Update</button>
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

      <div className="artistsList">
        <h2>Artists List</h2>
        <ul>
          {artistsArray.map((artist) => (<li key={artist.ArtistID}>{artist.ArtistName}</li>))}
        </ul>
      </div>

    </div>
  );
};

export default ArtistPage;