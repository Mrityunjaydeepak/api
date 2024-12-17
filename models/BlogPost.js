const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    heading1: { type: String, required: true },
    content1: { type: String, required: true },
    heading2: { type: String, required: true },
    content2: { type: String, required: true },
    heading3: { type: String, required: true },
    content3: { type: String, required: true },
    heading4: { type: String, required: true },
    content4: { type: String, required: true },
    heading5: { type: String, required: true },
    content5: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", BlogPostSchema);
