const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authentication = require("../authentication/auth");
const User = require("../model/user");
const Data = require("../model/data");
router.get("/", (req, res) => {
  res.send("it is router");
});
router.post("/register", async (req, res) => {
  try {
    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "+",
      "-",
      ".",
      "`",
      "~",
      "|",
      "<",
      ">",
      "=",
      "-",
      "_",
    ];
    let identification = "";
    for (let i = 0; i < 11; i++) {
      identification += letters[Math.floor(Math.random() * letters.length)];
    }
    console.log(identification);
    const { name, email, password } = req.body;

    if (name == "" || email == "" || password == "") {
      return res.status(400).json({ error: "please fill all the field" });
    }

    const Ifexist = await User.findOne({ email: email });
    if (Ifexist) {
      return res.status(400).json({ error: "already exist user" });
    }
    const newUser = new User({
      name,
      email,
      password,
      identification,
    });
    const result = await newUser.save();
    res.status(200).json({ message: "successfully registered" });
  } catch (error) {
    console.log(error);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == "" || password == "") {
      return res.status(404).json({ error: "please fill all the field" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "user not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = await user.generateToken();
      res.cookie("jwt", token);

      return res.status(200).json({ message: "logged in successful" });
    } else {
      console.log("password doe not match");
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/addData", authentication, async (req, res) => {
  try {
    const letters = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7,
      8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ];
    let generateID = "";
    for (let i = 0; i < 5; i++) {
      generateID += letters[Math.floor(Math.random() * letters.length)];
    }
    const { name, text } = req.body;
    if (name == "" || text == "") {
      return res.status(404).send({ error: "please fill all the field" });
    }
    const identification = req.identification;
    const existUser = await User.findOne({ identification: identification });
    const data = await existUser.addData(name, text, generateID);
    const newData = new Data({
      name,
      text,
      generateID,
      identification,
    });
    const result = await newData.save();
    if (result && data) {
      res.status(200).json({ message: "added" });
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/AllUsers", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
router.get("/getData", authentication, async (req, res) => {
  const identification = req.identification;
  const data = await Data.find({ identification: identification });
  req.data = data;
  res.send(req.data);
});
router.post("/addFavorite", async (req, res) => {
  const { generateID, identification } = req.body;
  console.log(generateID);
  console.log(identification);
  const data = await Data.findOne({
    generateID: generateID,
    identification: identification,
  });
  const result = await data.addFavourite();
  if (result) {
    res.status(200).json({ message: "Added to Favourite" });
  }
});
router.put("/updateData", async (req, res) => {
  const { _id, name, text } = req.body;
  console.log(_id);
  const result = await Data.findByIdAndUpdate(
    { _id },
    {
      name: name,
      text: text,
    },
    {
      new: true,
    }
  );
  if (result) {
    res.status(200).json({ message: "successfully updated" });
  }
});
router.delete("/deleteData",async(req,res)=>{
    const {_id} = req.body;
    console.log(_id);
    const result = await Data.findByIdAndDelete({_id});
    if(result){
      res.status(200).json({message:"Successfully deleted"});
    }
})
router.get("/get");
module.exports = router;
