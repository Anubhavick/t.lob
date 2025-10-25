import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import { getSystemPrompt } from './prompts.js';
import { basePrompt as reactBasePrompt } from './defaults/react.js';
import { basePrompt as nodeBasePrompt } from './defaults/node.js';
import cors from 'cors';

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "gpt-4o";

const client = new OpenAI({ baseURL: endpoint, apiKey: token });
const app = express();

app.use(cors());
app.use(express.json());

// Template endpoint - detects project type (react or node)
app.post("/template", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        
        const response = await client.chat.completions.create({
            model: model,
            max_tokens: 200,
            messages: [
                {
                    role: 'system',
                    content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

        const answer = response.choices[0]?.message.content?.trim().toLowerCase() || '';
        
        if (answer.includes("react")) {
            res.json({
                prompts: [
                    getSystemPrompt(),
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [reactBasePrompt]
            });
            return;
        }

        if (answer.includes("node")) {
            res.json({
                prompts: [
                    getSystemPrompt(),
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
                ],
                uiPrompts: [nodeBasePrompt]
            });
            return;
        }

        res.status(403).json({ message: "You cant access this" });
    } catch (error: any) {
        console.error("Template error:", error);
        res.status(500).json({ 
            message: "Error processing template request",
            error: error.message 
        });
    }
});

// Chat endpoint - handles conversation with AI
app.post("/chat", async (req, res) => {
    try {
        const messages = req.body.messages;
        
        const response = await client.chat.completions.create({
            messages: messages,
            model: model,
            max_tokens: 8000
        });

        console.log(response);

        res.json({
            response: response.choices[0]?.message.content
        });
    } catch (error: any) {
        console.error("Chat error:", error);
        res.status(500).json({ 
            message: "Error processing chat request",
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});