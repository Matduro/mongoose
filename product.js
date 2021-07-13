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
    required: true, // this makes it so the name is required.
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be positive ya dodo!"], // this is a custom message for validations.
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
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

// the value of 'this' changes with fat arrow functions, so in the following case we want to use traditional function.
// productSchema.methods.greet = function () {
//   console.log("Bonjour!");
//   console.log(`- ${this.name}`);
// };

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

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

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Mountain Bike" });
  //foundProduct.greet();

  // Use method instead so it can be reused
  // foundProduct.onSale = !foundProduct.onSale;
  //foundProduct.save();

  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
};

findProduct();
