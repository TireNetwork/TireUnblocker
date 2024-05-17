import express from 'express';
import basicAuth from 'express-basic-auth';
import http from 'node:http';
import { createBareServer } from '@tomphttp/bare-server-node';
import path from 'node:path';
import cors from 'cors';
import fetch from 'node-fetch';
import config from './config.js';

const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer('/bare/');
const PORT = process.env.PORT || 8080;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
// Middleware to serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

// Middleware to handle loading screen
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'static', 'loading.html'));
});

// Route to handle 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'static', '404.html'));
});

if (config.routes !== false) {
  const routes = [
    { path: '/', file: 'index.html' },
    { path: '/', file: 'games.html' },
    { path: '/', file: 'movies.html' },
    { path: '/', file: 'img' },
  ];

  // Setting up routes to serve static files
  routes.forEach((route) => {
    app.get(route.path, (req, res) => {
      res.sendFile(path.join(__dirname, 'static', route.file));
    });
  });
}

// Asynchronous function to fetch data from multiple base URLs
const fetchData = async (req, res, next, baseUrls) => {
  try {
    const reqTarget = baseUrls.map((baseUrl) => `${baseUrl}/${req.params[0]}`);
    let data;
    let asset;

    // Attempt to fetch data from the provided URLs
    for (const target of reqTarget) {
      asset = await fetch(target);
      if (asset.ok) {
        data = await asset.arrayBuffer();
        break;
      }
    }

    // If data is fetched successfully, send it to the client
    if (data) {
      res.end(Buffer.from(data));
    } else {
      next(); // Move to the next middleware if no data is fetched
    }
  } catch (error) {
    console.error('Error fetching:', error);
    next(error); // Pass the error to the next middleware
  }
};

// Handling HTTP requests and routing them appropriately
server.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

// Handling HTTP upgrades (for protocols like WebSockets)
server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

// Log server listening status
server.on('listening', () => {
  console.log(`TireUnblocker is running at http://localhost:${PORT}`);
});

// Start the server and listen on the specified port
server.listen({ port: PORT }, () => {
  console.log(`Server is listening on port ${PORT}`);
});
