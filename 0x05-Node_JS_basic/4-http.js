// Import the http module
const http = require('http');

// Create the server and assign it to the variable 'app'
const app = http.createServer((req, res) => {
    // For any endpoint, send a response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end('Hello Holberton School!\n');
});

// Make the server listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

// Export the 'app' variable
module.exports = app;

