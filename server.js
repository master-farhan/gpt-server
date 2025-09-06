require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const createSocketServer = require("./src/sockets/socket.server");
const httpServer = require("http").createServer(app);

connectDB();

// Pass CORS options so frontend can connect
createSocketServer(httpServer, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
    credentials: true, // needed for cookies/JWT
  },
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
