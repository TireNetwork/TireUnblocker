/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('node:http');
const { createBareServer } = require('@tomphttp/bare-server-node');
const fs = require('fs');
const path = require('path');

const httpServer = http.createServer();

const bareServer = createBareServer('/');

httpServer.on('request', (req, res) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeRequest(req, res);
	} else {
		// Serve static files
		const filePath = path.join(__dirname, 'static', req.url);
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end('Not found.');
				return;
			}
			const contentType = getContentType(filePath);
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(data);
		});
	}
});

httpServer.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

httpServer.on('listening', () => {
	console.log('HTTP server listening');
});

httpServer.listen({
	port: 8080,
});

function getContentType(filePath) {
	const extname = path.extname(filePath);
	switch (extname) {
		case '.html':
			return 'text/html';
		case '.css':
			return 'text/css';
		case '.js':
			return 'text/javascript';
		case '.json':
			return 'application/json';
		case '.png':
			return 'image/png';
		case '.jpg':
			return 'image/jpg';
		default:
			return 'application/octet-stream';
	}
}
