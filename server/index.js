const express = require("express");
require('dotenv').config()
const app = express();
const UserModel = require('./models/users');
require("./db/conn");

const cors =  require('cors');

app.use(express.json());
app.use(cors());


app.get("/getusers", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.send(data);
      } catch (err) {
        res.status(500).send(err.message);
      }
} )

app.post("/createuser" ,  async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);

});

app.delete("/deleteuser/:username" , async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserModel.findOneAndDelete({ username: username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);

  }
  catch (err){
    res.status(500).send(err.message);
  }
})


app.listen(8000,() => {
    console.log("Server runs perfectly");
})

