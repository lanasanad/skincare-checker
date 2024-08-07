const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");
const { API_KEY } = require('./config.js');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: API_KEY
});

app.post('/api/analyze', async (req, res) => {
  console.log("Received request:", req.body);
  try {
    const { ingredients, skinConcerns, productType } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with the ingredients of a skincare product, the product type, and the skin concerns it aims to address. Provide short points about 3 of the highlight ingredients. End it with a rating out of 10 on how much you reccomend it.Don't exceed 50 words. I want each ingredient point to start off like this: INGREDIENT - explanation. Each ingredient must be in a NEW line with space in between each ingredient. Then on a NEW line, include to reccomendation " 
        },
        {
          "role": "user",
          "content": `Product Type: ${productType}\nIngredients: ${ingredients}\nSkin Concerns: ${skinConcerns}`
        }
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1
    });

    res.json({ response: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));