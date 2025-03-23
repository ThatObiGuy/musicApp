import ReactDOM from 'react-dom/client'; // escential for Document Object Model (DOM) approach
import './index.css'; // Importing CSS file, this is for the consistent background colour across entire app
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root for the app - this root div is in the public/index.html file
root.render( // Render the app
  <App />
);
