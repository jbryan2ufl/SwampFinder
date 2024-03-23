const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const ImportData = require('./ImportData');

const Building = require('./Building');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Handle requests
    ImportData.loadBuildings();
    
  cors()(req, res, () => {});

  if (req.url === '/') {
    // Serve the index.html file
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/api/data') {
    // Handle API requests
    const data = Building.buildingContainer;
    const responseData = { data };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseData));
  } else {
    // Handle 404 Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});