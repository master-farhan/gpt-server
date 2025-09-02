const app = require("express")();
const cookieParser = require("cookie-parser");

app.use(require("express").json());
app.use(require("cors")());
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;