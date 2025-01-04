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
  const {
    portfolioName,
    headingOne,
    headingTwo,
    homePageImage,
    description,
    imageGallery,
    videoGallery,
  } = req.body;

  if (!portfolioName || !headingOne || !headingTwo || !homePageImage) {
    return res.status(400).json({
      msg: "portfolioName, headingOne, headingTwo, and homePageImage are required",
    });
  }

  try {
    const newPortfolio = new Portfolio({
      portfolioName,
      headingOne,
      headingTwo,
      homePageImage,
      description,
      imageGallery,
      videoGallery, // Include videoGallery field here
    });

    const savedPortfolio = await newPortfolio.save();
    res.json(savedPortfolio);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PATCH /api/portfolios/:id
// @desc Update portfolio fields (supports partial updates and gallery updates)
router.patch("/:id", async (req, res) => {
  const {
    portfolioName,
    headingOne,
    headingTwo,
    homePageImage,
    description,
    imageGallery,
    videoGallery,
    galleryIndex,
    newImage,
    videoIndex,
    newVideo,
  } = req.body;

  try {
    let portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ msg: "Portfolio not found" });
    }

    // Update general fields if provided
    if (portfolioName) portfolio.portfolioName = portfolioName;
    if (headingOne) portfolio.headingOne = headingOne;
    if (headingTwo) portfolio.headingTwo = headingTwo;
    if (homePageImage) portfolio.homePageImage = homePageImage;
    if (description) portfolio.description = description;

    // Update imageGallery if provided
    if (imageGallery) portfolio.imageGallery = imageGallery;

    // Update a specific image in imageGallery
    if (typeof galleryIndex === "number" && newImage) {
      if (galleryIndex < 0 || galleryIndex >= portfolio.imageGallery.length) {
        return res.status(400).json({ msg: "Invalid gallery image index" });
      }
      portfolio.imageGallery[galleryIndex] = newImage;
    }

    // Update videoGallery if provided
    if (videoGallery) portfolio.videoGallery = videoGallery;

    // Update a specific video in videoGallery
    if (typeof videoIndex === "number" && newVideo) {
      if (videoIndex < 0 || videoIndex >= portfolio.videoGallery.length) {
        return res.status(400).json({ msg: "Invalid video gallery index" });
      }
      portfolio.videoGallery[videoIndex] = newVideo;
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
