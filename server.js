require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const createSocketServer = require("./src/sockets/socket.server");
const httpServer = require("http").createServer(app);

connectDB();
createSocketServer(httpServer);
httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
