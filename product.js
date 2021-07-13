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
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
});

const Product = mongoose.model("Product", productSchema);

const bike = new Product({
  name: "Mountain Bike",
  price: 599,
  categories: ["Cycling", "Mountain Grade", "Made in Canada"],
});

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

Product.findOneAndUpdate(
  { name: "Mountain Bike" },
  { price: 799 },
  { new: true, runValidators: true }
)
  .then((data) => {
    console.log("The price update to $799 worked!");
    console.log(data);
  })
  .catch((err) => {
    console.log("Oh no, we have an error trying to updat the price");
    console.log(err);
  });
