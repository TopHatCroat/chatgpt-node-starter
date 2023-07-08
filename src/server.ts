import express from "express"

require("dotenv").config({ debug: process.env.NODE_ENV !== "production" })
const app = express()

const start = async () => {
  // TODO: initialise

  // TODO: create fixtures

  // TODO: create endpoints

  // Add your own express routes here

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server listening on port ${port}`)
}

start()
