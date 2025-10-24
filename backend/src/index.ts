import 'dotenv/config';
import OpenAI from "openai";
import { getSystemPrompt } from './prompts.js';

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-5";

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const systemPrompt = getSystemPrompt();
  
const response = await client.chat.completions.create({
  messages: [
    { role: "system", content: "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production. \n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them. \n\nUse icons from lucide-react for logos. \n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags. \n\n"},
    { role: "user", content: "What is the capital of India?" },
    { role: "user", content: "What is the capital of France?" }
  ],
    model: model
  });

  console.log(response.choices[0]?.message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

