import { Configuration, Model, OpenAIApi } from "openai"
import { ChatCompletionRequestMessage } from "openai/api"

let openAiApi: OpenAIApi | null = null

// Open AI options
interface InitAiOptions {
  apiKey: string;
  orgId?: string;
  model: string;
}

export interface Ai {
  chat(userPrompt: string, systemPrompt?: string | null): Promise<AiChatResponse | AiErrorResponse>;
}

let model: string = ""

function parseError(e: any): AiErrorResponse {
  return {
    message: e.response.statusText || "Unknown error",
    statusCode: e.response.status || 500,
  }
}

export const initAi = async (options: InitAiOptions): Promise<Ai> => {
  if (openAiApi !== null) {
    throw new Error("OpenAI API already initialized")
  }

  const configuration = new Configuration({
    organization: options.orgId || "",
    apiKey: options.apiKey,
  })

  openAiApi = new OpenAIApi(configuration)

  const models = await listModels()
  const chosenModel = models.find(model => model.id === options.model)

  if (chosenModel === undefined) {
    throw new Error(`Model ${options.model} not found. Available models: ${models.map(it => it.id).join(", ")}`)
  } else {
    console.log(`Using model ${chosenModel.id}`)
    model = chosenModel.id
  }

  return {
    chat: async (userPrompt, systemPrompt): Promise<AiChatResponse | AiErrorResponse> => {
      if (openAiApi === null) {
        throw new Error("OpenAI API not initialized")
      }

      const messages: Array<ChatCompletionRequestMessage> = [{
        role: "user",
        content: userPrompt,
      }]

      if (systemPrompt) {
        messages.push({
          role: "system",
          content: systemPrompt,
        })
      }

      try {
        const response = await openAiApi.createChatCompletion({
          messages,
          model,
          max_tokens: 500,
          temperature: 0.9,
          presence_penalty: 0.6,
          frequency_penalty: 0.0
        })

        console.log(response.data)

        return {
          response: response.data.choices[0].message?.content || ""
        }
      } catch (e: any) {
        console.log(e)
        return parseError(e)
      }

    }
  }
}

export const listModels = async (): Promise<Model[]> => {
  if (openAiApi === null) {
    throw new Error("OpenAI API not initialized")
  }

  try {
    const response = await openAiApi.listModels()
    return response.data.data
  } catch (e) {
    console.log(e)
    return []
  }
}
