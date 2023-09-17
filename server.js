const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
dotenv.config();
const app = express();
const productRoute = require("./routes/productRoute");

// db connetion
connectDB();

// midleawre
app.use(express.json());
app.use(cors());

// routing
app.use("/api", productRoute);
app.use("/", (req, res) => {
  res.send("App working ");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listen on localhost:${port}`);
});
