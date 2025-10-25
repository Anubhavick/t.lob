import 'dotenv/config';
import OpenAI from "openai";
import { getSystemPrompt } from './prompts.js';
import { basePrompt as reactBasePrompt } from './defaults/react.js';
import { basePrompt as nodeBasePrompt } from './defaults/node.js';

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-5";

async function detectProjectType(client: OpenAI, userPrompt: string): Promise<'react' | 'node' | 'none'> {
  const detectionResponse = await client.chat.completions.create({
    messages: [
      { 
        role: "system", 
        content: "You are a project type detector. Analyze the user's request and respond with ONLY one word: 'react' if they want a React/frontend project, 'node' if they want a Node.js backend project, or 'none' if unclear. Be concise, respond with only the word."
      },
      { role: "user", content: userPrompt }
    ],
    model: model,
    temperature: 0
  });

  const answer = detectionResponse.choices[0]?.message.content?.trim().toLowerCase() || 'none';
  
  if (answer.includes('react')) return 'react';
  if (answer.includes('node')) return 'node';
  return 'none';
}

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const systemPrompt = getSystemPrompt();
  const userPrompt = "make a todo app in react";
  
  
  const projectType = await detectProjectType(client, userPrompt);
  console.log(`Detected project type: ${projectType}`);

  let messages: Array<{ role: "system" | "user"; content: string }> = [
    { role: "system", content: systemPrompt }
  ];

  
  if (projectType === 'react') {
    messages.push({
      role: "user",
      content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
    });
  } else if (projectType === 'node') {
    messages.push({
      role: "user",
      content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
    });
  }


  messages.push({
    role: "user",
    content: userPrompt
  });

  const response = await client.chat.completions.create({
    messages: messages,
    model: model
  });

  console.log('\n=== AI Response ===\n');
  console.log(response.choices[0]?.message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

