const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketIO = require('socket.io')
const express = require('express')
const http = require('http')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const socketOps = require('./sockets')
const db = require('./config/db')


const PORT = process.env.PORT || 8080
const corsOptions = {
  origin: [
    "http://localhost:3000",
  ],
  credentials: true,
  allowedHeaders: ["Content-Type","Authorization","X-Requested-With","X-Forwarded-Proto", "Cookie","Set-Cookie"],
  exposedHeaders: ["Content-Type","Authorization","X-Requested-With","X-Forwarded-Proto","Cookie","Set-Cookie"],
}
const publicPath = path.join(__dirname, '../public')

app.set("trust proxy", "uniquelocal");
app.use(express.static(publicPath));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

db()

io.on('connection', (socket) => {
    socketOps(socket, io)
});

require('./routes')(app, fs)

server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});