const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// REPLACE THIS STRING WITH YOUR REAL ONE
const uri = process.env.MONGO_URI;

mongoose.connect(uri) 
   .then(() => console.log("Connected to MongoDB !!!")) 
    .catch(err => console.log("Database connection error: ", err));

// 2. Load the Model [cite: 780, 781]
require("./Customer");
const Customer = mongoose.model("Customer"); 

// --- ROUTES ---

// Route 1: Home [cite: 784]
app.get("/", (req, res) => {
    res.send("Welcome to customers service !!!"); 
});

// Route 2: Add a customer [cite: 788, 789]
app.post("/customer", (req, res) => {
    const newCustomer = {
        name: req.body.name, 
        email: req.body.email
    };
    
    const customer = new Customer(newCustomer); 
    customer.save() 
        .then(() => res.json({ message: "a new customer added !!!" })) 
        .catch(err => res.status(500).json(err));
});

// Route 3: List all customers [cite: 804, 805]
app.get("/customers", (req, res) => {
    Customer.find() 
        .then(customers => res.json({ customers: customers })) 
        .catch(err => res.status(500).json(err));
});

// Route 4: Get Customer by ID [cite: 809, 810]
app.get("/customers/:id", (req, res) => {
    Customer.findById(req.params.id) 
        .then(customer => {
            if (customer) res.json({ customer: customer }); 
            else res.status(404).json({ message: "Customer not found" });
        })
        .catch(err => res.status(500).json(err));
});

// Route 5: Delete a customer [cite: 815, 816]
app.delete("/customers/:id", (req, res) => {
    // Using the simple/standard method recommended in the PDF [cite: 820, 821]
    Customer.findByIdAndDelete(req.params.id) 
        .then(() => res.json({ message: "Customer deleted successfully" }))
        .catch(err => res.status(500).json(err));
});

// 3. Start the server on port 5555 [cite: 823]
app.listen(5555, () => {
    console.log("Up and running! This is our customers service"); 
});
module.exports = app;