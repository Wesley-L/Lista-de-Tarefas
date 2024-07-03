const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const http = require('http');
const socketIo = require('socket.io');
const chokidar = require('chokidar');
const cors = require('cors');

server.use(cors())
server.use(middlewares)
server.use('/api', router)

const PORT = 3001;
const httpServer = http.createServer(server)
const io = socketIo(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", (teste) => {
    console.log("Client disconnected", teste);
  });
});

const watcher = chokidar.watch('db.json');
watcher.on('change', (txt) => {
  console.log('db.json file changed', txt);
  io.emit('tasksUpdated');
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
