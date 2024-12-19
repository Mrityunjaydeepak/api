const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

// @route GET /api/testimonials
// @desc Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/testimonials/:id
// @desc Get a single testimonial by ID
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ msg: "Testimonial not found" });
    }
    res.json(testimonial);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/testimonials
// @desc Create a new testimonial
router.post("/", async (req, res) => {
  const { nameAndDesignation, reviewTitle, review } = req.body;

  if (!nameAndDesignation || !reviewTitle || !review) {
    return res
      .status(400)
      .json({
        msg: "Name and designation, review title, and review are required",
      });
  }

  try {
    const newTestimonial = new Testimonial({
      nameAndDesignation,
      reviewTitle,
      review,
    });

    const savedTestimonial = await newTestimonial.save();
    res.json(savedTestimonial);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PATCH /api/testimonials/:id
// @desc Update testimonial fields (supports partial updates)
router.patch("/:id", async (req, res) => {
  const { nameAndDesignation, reviewTitle, review } = req.body;

  try {
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ msg: "Testimonial not found" });
    }

    // Update fields if provided
    if (nameAndDesignation) testimonial.nameAndDesignation = nameAndDesignation;
    if (reviewTitle) testimonial.reviewTitle = reviewTitle;
    if (review) testimonial.review = review;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PATCH /api/testimonials
// @desc Bulk update testimonials
router.patch("/", async (req, res) => {
  const { updates } = req.body; // Array of updates [{ id, fieldsToUpdate }, ...]

  if (!Array.isArray(updates)) {
    return res.status(400).json({ msg: "Updates must be an array" });
  }

  try {
    const updatedTestimonials = await Promise.all(
      updates.map(async (update) => {
        const testimonial = await Testimonial.findById(update.id);
        if (!testimonial) {
          throw new Error(`Testimonial with ID ${update.id} not found`);
        }

        // Apply updates
        Object.keys(update.fieldsToUpdate).forEach((key) => {
          testimonial[key] = update.fieldsToUpdate[key];
        });

        return testimonial.save();
      })
    );

    res.json(updatedTestimonials);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/testimonials/:id
// @desc Delete a testimonial
router.delete("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ msg: "Testimonial not found" });
    }

    await testimonial.deleteOne();
    res.json({ msg: "Testimonial deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
