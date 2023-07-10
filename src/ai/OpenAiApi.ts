import { Configuration, Model, OpenAIApi } from "openai"

let openAiApi: OpenAIApi | null = null

interface InitAiOptions {
  apiKey: string;
  orgId?: string;
  // Open AI options
  model: string;
}

let model: string = ""

export const initAi = async (options: InitAiOptions) => {
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
