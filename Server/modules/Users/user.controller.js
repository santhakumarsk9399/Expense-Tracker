const User = require("../Users/user.model");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
exports.CreateAllUsers = async (req, res) => {
  try {
    const { name, password, email, mobile } = req.body;
    let user = new User({
      name,
      // age,
      email,
      mobile,
      password 
    });
    const CreateUsers = await user.save();
    res.json(CreateUsers);
  } catch (err) {
    console.log("error" + err);
  }
};
exports.FindUser = async (req, res) => {
  try {
    const getusers = await User.findOne({ _id: req.params.id });
    res.json(getusers);
  } catch (err) {
    console.log("error" + err);
  }
};
exports.UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name, age, email, mobile } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, mobile, password: "user@123" },
      { new: true }
    );
    res.send(user);
  } catch (err) {
    console.log("error" + err);
    res.status(500).send(err);
  }
};
exports.DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });
    console.log(user,"username")
    if (user == null) {
      res.status(401).json({
      success: false,
      message: "Invalid Credentials !!"
    });
      // res.status(401).json({ success: false, message: "Invalid Credentials !!" });
    } else {
      const token = await _generateJwt(user);
          const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      // Add or exclude any other fields as needed
    };
      // Save last login Date & Time
      user.lastLoginDateTime = new Date();
      await user.save();
      res.status(200).json({ success: true, message: "User Found" ,user :response, token:token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};
const _generateJwt = async (user) => {
  const tokenData = {
    userId: user._id ? user._id : null,
    name:user.name ?user.name:null,
  };
  const token = jwt.sign(tokenData, config.get("jwt_secret"), { expiresIn: '1h' });
  return { token: token };
};