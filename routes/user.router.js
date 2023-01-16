require("dotenv").config();

const express = require("express");
const userRouter = express.Router();
const { AuthModel } = require("../model/auth.model");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  const userData = await AuthModel.find();
  res.send(userData);
});

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const users = await AuthModel.find({ email });
  if (users.length > 0) {
    res.send({ Res: "user alreday Exists!!" });
  } else {
    try {
      bcrypt.hash(password, 8, async (e, hash) => {
        const newUser = new AuthModel({
          email: email,
          password: hash,
        });
        await newUser.save();
      });
      res.send({ Res: "User Created..." });
    } catch (e) {
      res.send({ Error: e.message });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthModel.findOne({ email });
    if (user) {
      const id = user._id;
      const hashPassord = user.password;
      bcrypt.compare(password, hashPassord, function (e, decoded) {
        if (decoded == true) {
          const token = jwt.sign({ userID: id }, process.env.key, {
            expiresIn: "1h",
          });
          res.send({"res":"Login Succcess",token:token})
        }
      });
    }else{
        res.send({"res":"Please try again !"})
    }
  } catch (e) {
    res.send({"mSG":"Something is Error from login"})
  }
});

module.exports = {userRouter}