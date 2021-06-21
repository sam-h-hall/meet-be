const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: true,
  origins: ["*"],
});

const PORT = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(PORT, () => {
  console.log(`*** Listening on port 8000 ***`)
})

// attach socket to express server
io.listen(server);
