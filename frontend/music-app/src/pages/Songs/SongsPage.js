import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import './SongsPage.css';

const SongsPage = () => {
    const [songsArray, setSongsArray] = useState([]); // Array of songs
    const [songName, setSongName] = useState(''); // Input field for song name - useState('') sets the initial value
    const [releaseYear, setReleaseYear] = useState(''); // Input field for release year
    const [albumId, setAlbumId] = useState(''); // Input field for album ID
    const [retrievedSong, setRetrievedSong] = useState(null); // Retrieved song object
    const [isCreating, setIsCreating] = useState(false); // states for different operations
    const [isRetrieving, setIsRetrieving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [serverMessage, setServerMessage] = useState(''); // New state variable for server messages

    useEffect(() => { // useEffect means as soon as the component is loaded, we fetch the songs
        fetchSongs();
    }, []);

    const fetchSongs = () => { // Function to fetch songs from the server
        axios.get('/api/songs') // Send a GET request to the server
        .then((response) => { 
            setSongsArray(response.data); // Set the songs array to the response data
        })
        .catch((error) => {
            console.error('Error fetching songs:', error);
        });
    };

    const addSong = () => { // Function to add a song - called on create button press
        const newSong = { // Create a new song object
            name: songName, // aligning vars with the backend controller
            releaseYear: releaseYear, // they get their values from the input fields
            albumId: albumId,
        };
  
        axios.post('/api/songs', newSong) // Send a POST request to the server - it'll be received by controller
        .then(() => {
            fetchSongs(); // Refresh the list of songs
            setServerMessage('Song added successfully'); // Set server message
        })
        .catch((error) => {
            console.error('Error adding song:', error);
            setServerMessage('Error adding song'); // Set server message
        });
    };


    const updateSong = () => {
        if (retrievedSong) { // If we have a retrieved song
            const updatedSong = {
            name: songName,
            releaseYear: releaseYear,
            albumId: albumId,
        };

        axios.put(`/api/songs/${retrievedSong.SongID}`, updatedSong)
        .then(() => {
            fetchSongs(); // Refresh the list of songs
            setServerMessage('Song updated successfully - retrieve again'); // Set server message
        })
        .catch((error) => {
            console.error('Error updating song:', error);
            setServerMessage('Error updating song'); // Set server message
        });
        }
    };

    const deleteSong = () => {
        if (retrievedSong) { // If we have a retrieved song
            axios.delete(`/api/songs/${retrievedSong.SongID}`)
            .then(() => {
                fetchSongs(); // Refresh the list of songs
                // Clear the input fields
                setSongName('');
                setReleaseYear('');
                setAlbumId('');
                setRetrievedSong(null);
                setIsDeleting(false);
                setServerMessage('Song deleted successfully'); // Set server message
            })
            .catch((error) => {
                console.error('Error deleting song:', error);
                setServerMessage('Error deleting song'); // Set server message
            });
        }
    };

    const retrieveSong = () => { // Function to retrieve a song by name
        const song = songsArray.find((s) => s.SongName === songName); // Find the song by name
        if (song) { // If we found the song
            setSongName(song.SongName); // Set the input fields to the song's values
            setReleaseYear(song.ReleaseYear);
            setAlbumId(song.AlbumID);
            setRetrievedSong(song); // Set the retrieved song
            setServerMessage('Song retrieved successfully'); // Set server message
        } else {
            setServerMessage('Song not found'); // Set server message
        }
    };


    return (

        <div className="songsTitle">
            <h1>Songs</h1>
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
                                    value={songName}
                                    onChange={(e) => setSongName(e.target.value)}
                                    placeholder="Enter Song Name"
                                    /> {/* Relevant fields for operation */}
                                    <input
                                    type="text"
                                    value={releaseYear}
                                    onChange={(e) => setReleaseYear(e.target.value)}
                                    placeholder="Enter Release Year"
                                    />
                                    <input
                                    type="text"
                                    value={albumId}
                                    onChange={(e) => setAlbumId(e.target.value)}
                                    placeholder="Enter Album ID"
                                    />
                                    <button onClick={addSong}>Save</button>
                                </div>
                            )}


                            {isRetrieving && (
                                <div> {/* If user is currently retrieving we show this div */}
                                    <input
                                    type="text"
                                    value={songName}
                                    onChange={(e) => setSongName(e.target.value)}
                                    placeholder="Enter Song Name"
                                    />
                                    <button onClick={retrieveSong}>Retrieve Song</button>
                                </div>
                            )}


                            {retrievedSong && (
                                <pre>{JSON.stringify(retrievedSong, null, 2)}</pre>
                            )}


                            {isDeleting && (
                                <div> {/* If user is currently deleting we show this div */}
                                <button onClick={deleteSong}>Confirm</button>
                                </div>
                            )}


                            {isUpdating && (
                                <div> {/* If user is currently updating we show this div */}
                                    <input
                                    type="text"
                                    value={songName}
                                    onChange={(e) => setSongName(e.target.value)}
                                    placeholder="Enter Song Name"
                                    />
                                    <input
                                    type="text"
                                    value={releaseYear}
                                    onChange={(e) => setReleaseYear(e.target.value)}
                                    placeholder="Enter Release Year"
                                    />
                                    <input
                                    type="text"
                                    value={albumId}
                                    onChange={(e) => setAlbumId(e.target.value)}
                                    placeholder="Enter Album ID"
                                    />
                                    <button onClick={updateSong}>Update</button>
                                </div>
                            )}
                        </div>

                        {/* This will be the server message div */}
                        {/* should r */}
                        <div className="ServerResponse">
                            <h3>Server Messages</h3>
                            <p>{serverMessage}</p>
                        </div>

                    </div>
                </div>
            </div>

        <div className="songsList">
            <h2>Songs List</h2>
            <ul>
                {songsArray.map((song) => (
                    <li key={song.SongID}>{song.SongName}</li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default SongsPage;