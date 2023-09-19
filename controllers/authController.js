const Auth = require("../models/authModel");

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const userExists = await Auth.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new Auth({ email, password });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error occurred when user tried to sign up" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await Auth.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ message: "No such email found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    return res.status(200).json({
      email,
      name: user.name,
      role: user.role,
      id: user.id,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred when user tried to sign in" });
  }
};

module.exports = {
  signUp,
  signIn,
};
