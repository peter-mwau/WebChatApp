import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const configuration = new Configuration({
    organization: "org-j8bCMjMpSafAj1GwnsueY2ZE",
    apikey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.post("/", async (req, res) => {
    const { message } = req.body;

const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: '${message}' },]
    })
    res.json({
        completion: completion.data.choices[0].message
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});