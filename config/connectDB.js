const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// mongodb+srv://<username>:<password>@cluster0.cvvga4z.mongodb.net/

const mongoURI = process.env.URI;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
