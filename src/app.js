const app = require("express")();
const cookieParser = require("cookie-parser");

app.use(require("express").json());
app.use(
  require("cors")({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/chat", require("./routes/chat.routes"));
app.use("/api/messages", require("./routes/message.routes"));


module.exports = app;
