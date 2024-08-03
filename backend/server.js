
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
    const { ingredients, skinConcerns } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with the ingredients of a skincare product and the skin concerns it aims to address. Your task is to provide short bullet points about the most significant ingredients and a final recommendation on whether the product is suitable for the specified skin concerns. do not exceed 60-70 words."
        },
        {
          "role": "user",
          "content": `Ingredients: ${ingredients}\nSkin Concerns: ${skinConcerns}`
        }
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1
    });

    res.json({ response: response.choices[0].message.content.trim() });
});
