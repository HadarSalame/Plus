const Month = require("../Models/monthModel");
const User = require("../Models/userModel");

const creatMonth = async (req, res) => {
  console.log("heeeee");
  const month = req.body;
  console.log("month", month);
  try {
    let new_month = await new Month(month);
    await new_month.save();
    const userId = new_month.user;
    const addMonthToUser = await User.findOne({ _id: userId });
    console.log("userid444", userId);
    addMonthToUser.monthly.push(new_month);
    await User.findByIdAndUpdate(userId, addMonthToUser, {
      new: true,
    });
    console.log("newmonth to check", new_month);
    res.status(201).json({ message: "Added successfully", new_month });
  } catch {
    res.status(401).json({ message: "Cannot create an object" });
  }
};

const getMonth = async (req, res) => {
  try {
    await Month.findById({ _id: req.params.id }).then((m) => {
      res.status(200).json(m);
    });
  } catch (error) {
    res.status(401).json({ message: "Cannot return an object" });
  }
};

//not working
const getAllMonth = async (req, res) => {
  try {
    await Month.find({ user: req.params.id }).then((e) => {
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot create an object" });
  }
};

const updateMonth = async (req, res) => {
  try {
    await Month.updateOne({ _id: req.params.id }, req.body).then((e) => {
      console.log("ok");
      res.status(200).json(e);
    });
  } catch {
    res.status(401).json({ message: "Cannot update the object" });
  }
};

const deleteMonth = async (req, res, next) => {
  const { id: monthId } = req.params;
  const month = await Month.findOne({ _id: monthId });
  await User.updateMany({ monthly: monthId }, { $pull: { monthly: monthId } });
  await Month.findOneAndDelete({ _id: monthId });
  if (!month) {
    res.status(401).json({ message: "Cannot delete the object" });
  }
  res.status(200).json({ month });
};

module.exports = {
  creatMonth,
  getMonth,
  getAllMonth,
  updateMonth,
  deleteMonth,
};
