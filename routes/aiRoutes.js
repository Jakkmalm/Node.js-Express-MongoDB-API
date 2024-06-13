const express = require("express");
const router = express.Router();
const { getOpenAIResponse } = require("../controller/openaiController");

router.post("/openai", async (req, res) => {
  try {
    const text = req.body.text;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const response = await getOpenAIResponse(text);
    console.log("OpenAI Response:", response);
    res.json(response);
  } catch (error) {
    console.error("Error handling OpenAI request:", error);
    res.status(500).json({ error: "Error handling OpenAI request" });
  }
});

module.exports = router;
