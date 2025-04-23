const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize Socket.IO with proper CORS
initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
