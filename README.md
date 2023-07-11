# Chat GPT Node Starter

This project is intended to help you start building a OpenAI powered chatbot using Node.js.

## 📃 Scripts Overview

The following scripts are available in the `package.json`:

- `dev`: Starts the development server
- `build`: Builds the app for production
- `start`: Runs the production server
- `prettier`: Runs prettier to check for formatting issues
- `prettier:fix`: Runs prettier to fix formatting issues

## How to Use

`yarn dev` will start up your application and reload on any changes.

## Environment Variables

The following environment variables are available to use:

```shell
# Application port
PORT=3000
# OpenAI API Key (required)
OPENAI_API_KEY=YOUR_API_KEY
# OpenAI Organization ID
OPENAI_ORG_ID=YOUR_ORG_ID
# OpenAI Model ID
OPENAI_MODEL_ID=YOUR_MODEL_ID
```

## FAQ

> I'm getting a 429 error when I try to make a request

As of right now, the OpenAI API requires you to have a paid account to make requests. You can sign up for one [here](https://platform.openai.com/account/billing/overview).
