const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();


// ENABLE CORS
app.use(cors({
  origin: "*",                    // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// Middleware to parse JSO   
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", require("./routes/contactRoutes"));


// Test route
app.get("/", (req, res) => {
  res.send("API Working!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Add a new product
app.post("/api/products", async (req, res) => {
  try {
    const { name, price, description } = req.body; // get data from request body
    const product = new Product({ name, price, description }); // create new product
    const savedProduct = await product.save(); // save to database
    res.status(201).json(savedProduct); // return saved product
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
