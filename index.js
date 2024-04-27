// Importing required modules
const express = require('express'); // Express.js framework
const path = require('path'); // Path module for file paths

// Creating an Express application
const app = express();

// Serving static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));

// Route for serving the index.html file
app.get('/', (req, res) => {
  // Sending the index.html file when the root URL is accessed
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Starting the server
const PORT = process.env.PORT || 3000; // Using the environment variable PORT or defaulting to port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
