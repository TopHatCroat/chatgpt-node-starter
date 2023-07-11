import { Express, Request, Response } from "express"
import { Ai } from "../ai/OpenAiApi"

export const initEndpoints = (app: Express, ai: Ai) => {
  app.get('/chat', async (req: Request, res: Response) => {
    const prompt = req.query.prompt;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const result = await ai.chat(prompt as string)

    res.json({ result });
  });
}