const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN!!");
  })
  .catch((error) => {
    console.log("OH NO THE CONNECTION DID NOT WORK!!");
    console.log(error);
  });
