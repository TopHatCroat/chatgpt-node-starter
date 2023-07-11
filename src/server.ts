import express, { Request, Response } from "express"
import { initAi, listModels } from "./ai/OpenAiApi"
import { initEndpoints } from "./api/Controller"

require("dotenv").config({ debug: process.env.NODE_ENV !== "production" })
const app = express()

const start = async () => {
  // TODO: create fixtures

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not set")
  }

  const initOptions = {
    apiKey: process.env.OPENAI_API_KEY,
    orgId: process.env.OPENAI_ORG_ID,
    model: process.env.OPENAI_MODEL || "davinci",
  }

  const ai = await initAi(initOptions)

  initEndpoints(app, ai)

  const port = process.env.PORT || 3000
  app.listen(port)

  console.log(`Server listening on port ${port}`)
}

start()
