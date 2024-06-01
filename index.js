require("dotenv").config();
const express = require("express");
const app = express();
const productRoute = require('./routes/product.route');
const Product = require("./models/product.model");
const mongoose = require("mongoose"); // importing mongoose

// middleware
app.use(express.json()); // express middleware
app.use(express.urlencoded({extended: false})); // so that form data ko bhi hum send kar saktein hai

// routing 
app.use("/api/products", productRoute);



// adding Product to products collection
// app.post("/api/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(200).json(product);
//     console.log("Product Updated.");
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//     console.log(err);
//   }
// });

// fetching Products from products collection 
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// getting id using req.params
// app.get('/api/products/:id', async (req,res)=>{
//     try{
//         const { id } = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product);
//     }
//     catch(err){
//         res.status(500).json({message: err.message});
//     }
// })


//  update peoduct by id
// app.put('api/products/:id', async (req,res)=>{
//     try{
//         const { id } = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);
//         if(!product){
//             return res.status(400).json({message: "Product not found"});
//         }
//         // checking if product is updated or not
//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct);
//     }
//     catch(err){
//         res.status(500).json({message: err.message});
//     }
// });

//  delete any product by id
// app.delete('/api/products/:id', async(req, res)=>{
//     try{
//         const { id } = req.params;

//         const product = await Product.findByIdAndDelete(id);
//         res.status(200).json({message: "Deleted successfully"});
//         if(!product){
//             return res.status(400).json({message:" The element you are trying to delete doesnt exist."});
//         }

//         const deletedProduct = await Product.findById(id);
//         res.status(200).json(deletedProduct);
//     }
//     catch(err){
//         res.status(500).json({message: err.message});
//     }
// });


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
