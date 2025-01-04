const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  reviewTitle: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  img: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
