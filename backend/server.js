const mongoose = require("mongoose");
const dotenv = require("dotenv");
const appServer = require("./app");
dotenv.config();

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/chesplay")
  .then((con) => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.log("Error while connecting to DB", err);
  });

// Set the port for the server
const port = process.env.PORT || 3001;
appServer.listen(port, () => {
  console.log("Listening on port ", port);
});
