const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(require("express").json());
app.use(
  require("cors")({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/chat", require("./routes/chat.routes"));
app.use("/api/messages", require("./routes/message.routes"));
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
