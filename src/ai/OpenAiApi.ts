import { Configuration, Model, OpenAIApi } from "openai"

let openAiApi: OpenAIApi | null = null

export const initAi = (apiKey: string, orgId?: string) => {
  if (openAiApi !== null) {
    throw new Error("OpenAI API already initialized")
  }

  const configuration = new Configuration({
    organization: orgId || "",
    apiKey: apiKey
  })

  openAiApi = new OpenAIApi(configuration)
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
