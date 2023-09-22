const Auth = require("../models/authModel");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const userExists = await Auth.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new Auth({ name, email, password });

    const doc = await newUser.save();

    res.status(201).json({ id: doc.id, role: doc.role });
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

const fetchLoggedInUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Auth.findById(id);

    if (!user) {
      return res.status(404).json({ message: "No such user found" });
    }

    return res.status(200).json({
      id: user.id,
      addresses: user.address,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateUserAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAuth = await Auth.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      upsert: false,
      new: true,
    });

    if (!updatedAuth) {
      return res.status(404).json({ message: "Auth not found" });
    }

    res.status(200).json(updatedAuth);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  fetchLoggedInUser,
  updateUserAuth,
};
