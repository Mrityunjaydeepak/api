const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  headerImage: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
