const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  portfolioName: {
    type: String,
    required: true,
  },
  headingOne: {
    type: String,
    required: true,
  },
  headingTwo: {
    type: String,
    required: true, // Compulsory
  },
  homePageImage: {
    type: String,
    required: true, // Compulsory
  },
  description: {
    type: String,
    required: false, // Optional
  },
  imageGallery: [
    {
      heading: {
        type: String,
        required: false, // Optional
      },
      content: {
        type: String,
        required: false, // Optional
      },
      imgUrl: {
        type: String,
        required: true, // Compulsory
      },
    },
  ],
  videoGallery: [
    {
      heading: {
        type: String,
        required: false, // Optional
      },
      content: {
        type: String,
        required: false, // Optional
      },
      videoUrl: {
        type: String,
        required: false, // Compulsory
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
