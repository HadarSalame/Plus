const User = require("../Models/userModel");
const asyncWrapper = require("../Middleware/async");
const { createCustomError } = require("../Errors/customError");
const { creatMonth } = require("./monthController");


const createUser = async (req, res) => {
  console.log("svr", req.body);
  const user = req.body;
  try {
    //send messege to numberphone with numbers
    // if ( await User.findOne({ mail: user.mail })) {
    //   res.send("this user is exist");
    // } else {
      let new_user = await new User(user);
      await new_user.save();
      // creatMonth(new_user._id)
      console.log("svr new", new_user);
      res.status(201).send(new_user);
    // }
  } catch {
    res.status(401).json({ message: "Cannot create an object" });
  }
};

const updateUser = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, req.body).then((u) => {
      res.status(200).json(u);
    });
  } catch {
    res.status(401).json({ message: "Cannot update the object" });
  }
};

const getUser = async (req, res) => {
  try {
    await User.find({ _id: req.params.id }).then((u) => {
      res.status(200).json(u);
    });
  } catch (error) {
    res.status(401).json({ message: "Cannot return an object" });
  }
};

const login = async (req, res) => {
  console.log(req.params);
  let email = req.params.mail;
  let pass = req.params.password;
  await User.findOne({ mail: email, password: pass })
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(401).json({ message: "Cannot login", error });
    });
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  login,
};
