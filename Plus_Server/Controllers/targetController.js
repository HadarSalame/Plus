const Target = require("../Models/targetModel");
const User = require("../Models/userModel");

const createTarget = async (req, res) => {
  const target = req.body;
  console.log("target ", target);
  try {
    let new_target = await new Target(target);
    await new_target.save();
    const userId = new_target.user;
    const addTargetToUser = await User.findOne({ _id: userId });
    console.log("userId", addTargetToUser);
    addTargetToUser.targets.push(new_target)
    await User.findByIdAndUpdate(userId, addTargetToUser, {
      new: true,
    });
    res.status(201).json({ message: "Added successfully", new_target });
  } catch {
    res.status(401).json({ message: "Cannot create an object" });
  }
};

const getAllTarget = async (req, res, next) => {
  try {
    await Target.find({ user: req.params.id }).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot create an object" });
  }
};

const updateTarget = async (req, res) => {
  try {
    await Target.updateOne({ _id: req.params.id }, req.body).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot update the object" });
  }
};

const getTarget = async (req, res) => {
  try {
    await Target.findById({ _id: req.params.id }).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot find the object" });
  }
};

const deleteTarget = async (req, res, next) => {
  const { id: targetID } = req.params;
  const target = await Target.findOne({ _id: targetID });
  await User.updateMany({ targets: targetID }, { $pull: { targets: targetID } });
  await Target.findOneAndDelete({ _id: targetID });
  if (!target) {
    res.status(401).json({ message: "Cannot delete the object" });
  }
  res.status(200).json({ target });
};

module.exports = {
  createTarget,
  getAllTarget,
  updateTarget,
  getTarget,
  deleteTarget
};
