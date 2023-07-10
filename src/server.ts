import express from "express"
import { initAi, listModels } from "./ai/OpenAiApi"

require("dotenv").config({ debug: process.env.NODE_ENV !== "production" })
const app = express()

const start = async () => {
  // TODO: initialise

  // TODO: create fixtures

  // TODO: create endpoints

  // Add your own express routes here

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not set")
  }

  const port = process.env.PORT || 3000
  app.listen(port)

  console.log(`Server listening on port ${port}`)

  const initOptions = {
    apiKey: process.env.OPENAI_API_KEY,
    orgId: process.env.OPENAI_ORG_ID,
    model: process.env.OPENAI_MODEL || "davinci",
  }

  initAi(initOptions)
}

start()
