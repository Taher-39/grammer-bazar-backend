const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
dotenv.config();
const app = express();
const productRoute = require("./routes/productRoute");

app.use(express.json());

// db connetion
connectDB();

app.use("/api", productRoute);

app.use("/", (req, res) => {
  res.send("App working ");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listen on port:${port}`);
});
