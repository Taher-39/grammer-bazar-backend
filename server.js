const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
dotenv.config();
const app = express();
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const authRoute = require("./routes/authRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");

// db connetion
connectDB();

// midleawre
app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

// routing
app.use("/products", productRoute);
app.use("/category", categoryRoute);
app.use("/brand", brandRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);

app.use("/", (req, res) => {
  res.send("App working ");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listen on localhost:${port}`);
});
