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

// this method allows for validation from mongoose compared to the method used in index.js
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // this makes it so the name is required
  },
  price: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

const bike = new Product({ name: "Mountain Bike", price: "599" });
bike
  .save()
  .then((data) => {
    console.log("IT WORKED!");
    console.log(data);
  })
  .catch((err) => {
    console.log("OH NO ERROR!");
    console.log(err.errors.name.properties.message);
  });