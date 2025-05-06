# Music App

<p align="center">
  <img src="https://raw.githubusercontent.com/ThatObiGuy/musicApp/refs/heads/main/Screenshot.jpg" alt="Music App Screenshot" width="600">
</p>

## Overview

A database-driven web application for managing and exploring music collections. Users can interact with a database that stores artists, songs, and albums. This project represents the third installment in my web development learning series and marks my first full-stack application, building upon the concepts explored in my previous projects and adding database integration.

## Features

- Artist, song, and album database management
- Add, edit, and delete music entries
- User-friendly interface with responsive design
- Database integration for persistent data storage

## Technologies Used

- **HTML5** - Application structure and form elements
- **CSS3** - Styling and responsive design
- **JavaScript** - Core functionality and event handling
- **SQL** - Database queries and management
- **Node.js** - Server-side processing
- **MySQL** - Database system for data storage
- **Express** - Web application framework

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js and npm installed locally
- XAMPP or similar for MySQL database hosting

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ThatObiGuy/musicApp.git
   ```

2. Recreate the database:
   I've used XAMPP and the create statements are available within the repo, with statements to populate using music I like.

3. Start the front and backend:
   ```bash
   cd frontend/musicApp
   npm start
   ```
   and in another cmd terminal
   ```bash
   cd backend
   node server.js
   ```

## How to Use

This full-stack application provides a complete music management system:

1. **Browse Your Collection**: Navigate through your personally curated music library organized by artists, albums, and songs.

2. **Manage Your Music**: Add new artists, albums, and songs to your collection using the intuitive form interfaces.

3. **Update Entries**: Edit existing information by selecting any entry and modifying its details.

4. **Remove Items**: Delete any artists, albums, or songs you no longer wish to keep in your collection.

5. **Experience Full-Stack**: Enjoy the seamless integration between the frontend interface and backend database—all data persists between sessions!

## Development Notes

This project features:
- Integration with a relational database system
- Implementation of CRUD operations (Create, Read, Update, Delete)
- Client and server-side communication
- Responsive UI design for multiple device compatibility

## Learning Outcomes

Through building this application, I:
- Gained experience with database design and SQL queries
- Developed skills in server-side programming with Node.js
- Implemented complete CRUD functionality
- Enhanced understanding of data relationships
- Applied form validation and user input processing
- **Built my first complete full-stack application**

## Future Enhancements

- [ ] User authentication and personal collections
- [ ] Search and filter functionality
- [ ] Music recommendation engine
- [ ] Album artwork and artist images
- [ ] Integration with music streaming APIs
- [ ] Social sharing features
- [ ] Music playback capabilities

## Project Series Context

This music application is the third installment in my web development learning series:
1. [Crystal Apple Pomodoro Timer](https://github.com/ThatObiGuy/pomodoroTimer) - HTML, CSS, and JavaScript basics (Frontend)
2. [Weather Application](https://github.com/ThatObiGuy/weatherApplication) - JSON data handling and local development environment (Frontend)
3. **Music App** - Complete full-stack application with database integration and CRUD operations (Frontend + Backend)
4. *Coming Soon* - Advanced features and frameworks

## Acknowledgments

- Built by [ThatObiGuy](https://github.com/ThatObiGuy)
- Shoutout to XAMPP for saving my bacon because I no longer have access to postgresql

---

<p align="center">Star this repository if you found it useful!</p>
