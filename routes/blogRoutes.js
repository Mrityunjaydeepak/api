const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");

// @route   POST /api/blogs
// @desc    Create a new blog post
router.post("/", async (req, res) => {
  try {
    const {
      image,
      heading1,
      content1,
      heading2,
      content2,
      heading3,
      content3,
      heading4,
      content4,
      heading5,
      content5,
    } = req.body;

    const blogPost = new BlogPost({
      image,
      heading1,
      content1,
      heading2,
      content2,
      heading3,
      content3,
      heading4,
      content4,
      heading5,
      content5,
    });

    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route   GET /api/blogs
// @desc    Get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/blogs/:id
// @desc    Get a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PATCH /api/blogs/:id
// @desc    Update one or multiple fields of a blog post by ID
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Extract the fields to update from the request body
    const updates = req.body;

    // Check if there are no fields to update
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields provided to update." });
    }

    // Find and update the blog post
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      id,
      { $set: updates }, // Apply updates dynamically
      { new: true, runValidators: true } // Return updated document and validate updates
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ message: "Blog post not found." });
    }

    res.status(200).json({
      message: "Blog post updated successfully.",
      updatedBlogPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post by ID
router.delete("/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
