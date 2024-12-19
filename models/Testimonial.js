const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  nameAndDesignation: {
    type: String,
    required: true, // e.g., "John Doe, CEO at ExampleCorp"
  },
  reviewTitle: {
    type: String,
    required: true, // Short title for the review
  },
  review: {
    type: String,
    required: true, // Detailed review content
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation timestamp
  },
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
