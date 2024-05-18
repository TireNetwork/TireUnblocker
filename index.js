import express from 'express';
import basicAuth from 'express-basic-auth';
import http from 'node:http';
import { createBareServer } from '@tomphttp/bare-server-node';
import path from 'node:path';
import cors from 'cors';
import config from './config.js';
const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer('/bare/');
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

// Route to handle 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'static', '404.html'));
});

// Remaining routes and logic...

if (config.routes !== false) {
  const routes = [
    { path: '/', file: 'index.html' },
    { path: '/', file: 'games.html' },
    { path: '/', file: 'movies.html' },
    { path: '/', file: 'img' },
  ];

  routes.forEach((route) => {
    app.get(route.path, (req, res) => {
      res.sendFile(path.join(__dirname, 'static', route.file));
    });
  });
}

const fetchData = async (req, res, next, baseUrls) => {
  try {
    const reqTarget = baseUrls.map((baseUrl) => `${baseUrl}/${req.params[0]}`);
    let data;
    let asset;

    for (const target of reqTarget) {
      asset = await fetch(target);
      if (asset.ok) {
        data = await asset.arrayBuffer();
        break;
      }
    }

    if (data) {
      res.end(Buffer.from(data));
    } else {
      next();
    }
  } catch (error) {
    console.error('Error fetching:', error);
    next(error);
  }
};

server.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on('listening', () => {
  console.log(`TireUnblocker is running at http://localhost:${PORT}`);
});

server.listen({
  port: PORT,
});
