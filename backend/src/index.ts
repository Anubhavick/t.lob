import 'dotenv/config';
import OpenAI from "openai";
import { getSystemPrompt } from './prompts.js';
import { basePrompt as reactBasePrompt } from './defaults/react.js';
import { basePrompt as nodeBasePrompt } from './defaults/node.js';

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-5";

// Simple keyword-based detection - NO API CALL
function detectProjectType(userPrompt: string): 'react' | 'node' | 'none' {
  const lowerPrompt = userPrompt.toLowerCase();
  
  if (lowerPrompt.includes('react') || lowerPrompt.includes('frontend') || 
      lowerPrompt.includes('ui') || lowerPrompt.includes('component')) {
    return 'react';
  }
  
  if (lowerPrompt.includes('node') || lowerPrompt.includes('backend') || 
      lowerPrompt.includes('server') || lowerPrompt.includes('api')) {
    return 'node';
  }
  
  return 'none';
}

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const systemPrompt = getSystemPrompt();
  const userPrompt = "make a todo app in react";
  
  // Detect project type using keywords (NO API call - saves rate limit)
  const projectType = detectProjectType(userPrompt);
  console.log(`Detected project type: ${projectType}`);

  let messages: Array<{ role: "system" | "user"; content: string }> = [
    { role: "system", content: systemPrompt }
  ];

  
  if (projectType === 'react') {
    messages.push({
      role: "user",
      content: `You have a Vite + React + TypeScript project with Tailwind CSS and Lucide icons already set up. Base files exist: package.json, index.html, vite.config.ts, tailwind.config.js, src/App.tsx, src/main.tsx, src/index.css\n\nNow: ${userPrompt}`
    });
  } else if (projectType === 'node') {
    messages.push({
      role: "user",
      content: `You have a Node.js project with package.json and index.js already set up.\n\nNow: ${userPrompt}`
    });
  } else {
    messages.push({
      role: "user",
      content: userPrompt
    });
  }

  const response = await client.chat.completions.create({
    messages: messages,
    model: model
  });

  console.log('\n=== AI Response ===\n');
  console.log(response.choices[0]?.message.content);
  
  return {
    projectType,
    prompts: [systemPrompt, messages[1]?.content || userPrompt],
    uiPrompts: projectType === 'react' ? [reactBasePrompt] : projectType === 'node' ? [nodeBasePrompt] : [],
    response: response.choices[0]?.message.content
  };
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});