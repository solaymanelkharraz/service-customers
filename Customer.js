const mongoose = require("mongoose");

// Define the structure of a customer [cite: 757, 758]
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Note: it is required: true [cite: 764]
    email: { type: String, required: true }
});

// Create the model
mongoose.model("Customer", customerSchema);