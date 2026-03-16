const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { GoogleGenAI } = require('@google/genai');

// GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().lean();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single car
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST AI Recommend
// Uses Gemini API with Google Search grounding to dynamically find and return car details
router.post('/recommend', async (req, res) => {
  try {
    const { preferences } = req.body;
    
    // If no API key or no preferences, return a 400 or fallback
    if (!process.env.GEMINI_API_KEY || !preferences) {
      console.log('No Gemini API Key or preferences found.');
      return res.status(400).json({ message: 'Gemini API Key and preferences are required for dynamic search.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `
      You are an expert car matchmaker for the Indian market.
      The user's preferences are: "${preferences}".
      
      Note on Currency: Prices should be estimated in Indian Rupees (INR). 1 Lakh = 1,00,000 INR. 1 Crore = 1,00,00,000 INR. 

      Task: 
      1. Use Google Search to find the top 3 best matching cars available or arriving soon in the Indian market that fit these exact preferences.
      2. You MUST include high-quality, realistic image URLs for these cars. (e.g., from Unsplash, Wikimedia Commons, or official press images if accessible).
      3. Return a JSON array of 3 car objects.

      The JSON must strictly follow this structure:
      [
        {
          "_id": "dynamic-id-1", 
          "make": "String",
          "model": "String",
          "year": Number,
          "price": Number, // Exact number in INR (e.g. 1500000 for 15 Lakhs)
          "category": "String", // e.g. "Electric", "SUV", etc.
          "description": "String (engaging 2-sentence description)",
          "colors": ["String", "String"],
          "images": ["String (URL to a high quality image)"],
          "specs": {
            "horsepower": Number,
            "zeroToHundred": Number,
            "rangeOrMpg": "String (e.g. '400 km' or '15 km/l')",
            "drivetrain": "String"
          }
        }
      ]

      Return ONLY the raw JSON array. Do not include markdown blocks, backticks, or any conversational text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
         tools: [{ googleSearch: {} }],
         temperature: 0.2
      }
    });

    let generatedCars = [];
    try {
      // Strip potentially added markdown blocks from the response
      let cleanedText = response.text.trim();
      if (cleanedText.startsWith('\`\`\`json')) {
        cleanedText = cleanedText.replace(/^\`\`\`json/i, '').replace(/\`\`\`$/i, '').trim();
      } else if (cleanedText.startsWith('\`\`\`')) {
        cleanedText = cleanedText.replace(/^\`\`\`/i, '').replace(/\`\`\`$/i, '').trim();
      }
      generatedCars = JSON.parse(cleanedText);
      if (!Array.isArray(generatedCars)) generatedCars = [];
      
      // Inject random IDs if they are missing or static
      generatedCars = generatedCars.map((car, index) => ({
        ...car,
        _id: car._id && car._id !== 'dynamic-id-1' ? car._id : 'gen_' + Date.now() + '_' + index
      }));
      
    } catch (parseErr) {
      console.error('Failed to parse Gemini dynamic response:', response.text, parseErr);
      return res.status(500).json({ message: 'Failed to generate recommendations. Please try again.' });
    }

    res.json(generatedCars);

  } catch (err) {
    console.error('AI Recommendation Error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
