// server.js
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

console.log("Starting server...");

(async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
})();
