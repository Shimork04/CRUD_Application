require("dotenv").config();
const express = require("express");
const app = express();
const Product = require("./models/product.model");
const mongoose = require("mongoose"); // importing mongoose

app.use(express.json()); // express middleware

// adding Product to products collection
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
    console.log("Product Updated.");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

// fetching Products from products collection 
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// connection of mongodb atlas
mongoose
  .connect(process.env.MONGO_CONN_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(3000, () => {
      console.log("server-listening, on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });

console.log("now that db is, connected its time to see servver");

app.get("/", (req, res) => {
  res.send("Hello bitch");
});
