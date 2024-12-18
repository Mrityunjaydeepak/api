const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

// @route GET /api/portfolios
// @desc Get all portfolios
router.get("/", async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/portfolios/:id
// @desc Get a single portfolio by ID
router.get("/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/portfolios
// @desc Create a new portfolio
router.post("/", async (req, res) => {
  const { title, headerImage, homePageImage, description, imageGallery } =
    req.body;

  if (!title || !headerImage || !homePageImage) {
    return res
      .status(400)
      .json({ msg: "Title, headerImage, and homePageImage are required" });
  }

  try {
    const newPortfolio = new Portfolio({
      title,
      headerImage,
      homePageImage,
      description,
      imageGallery,
    });

    const savedPortfolio = await newPortfolio.save();
    res.json(savedPortfolio);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PATCH /api/portfolios/:id
// @desc Update portfolio fields (supports partial updates and gallery image updates)
router.patch("/:id", async (req, res) => {
  const {
    title,
    headerImage,
    homePageImage,
    description,
    imageGallery,
    galleryIndex,
    newImage,
  } = req.body;

  try {
    let portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ msg: "Portfolio not found" });
    }

    // Update general fields if provided
    if (title) portfolio.title = title;
    if (headerImage) portfolio.headerImage = headerImage;
    if (homePageImage) portfolio.homePageImage = homePageImage;
    if (description) portfolio.description = description;

    // Update imageGallery if provided
    if (imageGallery) portfolio.imageGallery = imageGallery;

    // Update a specific image in imageGallery if galleryIndex and newImage are provided
    if (typeof galleryIndex === "number" && newImage) {
      if (galleryIndex < 0 || galleryIndex >= portfolio.imageGallery.length) {
        return res.status(400).json({ msg: "Invalid gallery image index" });
      }
      portfolio.imageGallery[galleryIndex] = newImage;
    }

    const updatedPortfolio = await portfolio.save();
    res.json(updatedPortfolio);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/portfolios/:id
// @desc Delete a portfolio
router.delete("/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ msg: "Portfolio not found" });
    }

    await portfolio.deleteOne();
    res.json({ msg: "Portfolio deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
