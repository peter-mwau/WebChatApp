require('apienv').config();

// Backend server (e.g., using Node.js with Express)
const express = require('express');
const openai = require('openai');

const app = express();
const apiKey = process.env.API_KEY;
const chatgpt = new openai.ChatCompletion({ apiKey });

app.use(express.json());

// Route to handle user messages
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await chatgpt.complete([
      { role: 'system', content: 'You are a user' },
      { role: 'user', content: message },
    ]);

    const reply = response.choices[0].message.content;

    // Return the model's reply to the frontend
    res.json({ reply });
  } catch (error) {
    console.error('ChatGPT API request error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3001, () => {
  console.log('Backend server is running on port 3001');
});
