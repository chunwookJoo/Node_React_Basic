const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Joo:abcd1234@boilerplate.rll8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello worrrld"));
app.listen(port, () => console.log(port));
