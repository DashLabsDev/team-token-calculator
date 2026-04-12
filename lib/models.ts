export interface AIModel {
  id: string;
  name: string;
  provider: string;
  providerSlug: string;
  inputCostPerMillion: number;
  outputCostPerMillion: number;
  cachedInputCostPerMillion?: number;
  contextWindow: number;
  description: string;
  releaseDate?: string;
  isPopular?: boolean;
  category: "frontier" | "standard" | "efficient" | "open-source";
}

export const PROVIDERS = [
  { id: "openai", name: "OpenAI", color: "#10a37f" },
  { id: "anthropic", name: "Anthropic", color: "#d97706" },
  { id: "google", name: "Google", color: "#4285f4" },
  { id: "meta", name: "Meta", color: "#0866ff" },
  { id: "mistral", name: "Mistral", color: "#ff6b35" },
  { id: "deepseek", name: "DeepSeek", color: "#6366f1" },
  { id: "xai", name: "xAI", color: "#000000" },
  { id: "cohere", name: "Cohere", color: "#39c5bb" },
];

export const MODELS: AIModel[] = [
  // OpenAI
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    providerSlug: "openai",
    inputCostPerMillion: 2.5,
    outputCostPerMillion: 10.0,
    cachedInputCostPerMillion: 1.25,
    contextWindow: 128000,
    description: "Flagship multimodal model. Best for complex reasoning, coding, and analysis.",
    releaseDate: "2024-05",
    isPopular: true,
    category: "frontier",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    providerSlug: "openai",
    inputCostPerMillion: 0.15,
    outputCostPerMillion: 0.6,
    cachedInputCostPerMillion: 0.075,
    contextWindow: 128000,
    description: "Fast and affordable for simple tasks, classification, and quick completions.",
    releaseDate: "2024-07",
    isPopular: true,
    category: "efficient",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    providerSlug: "openai",
    inputCostPerMillion: 10.0,
    outputCostPerMillion: 30.0,
    contextWindow: 128000,
    description: "Previous flagship. Strong reasoning with large context window.",
    releaseDate: "2024-04",
    category: "frontier",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    providerSlug: "openai",
    inputCostPerMillion: 0.5,
    outputCostPerMillion: 1.5,
    contextWindow: 16000,
    description: "Legacy model for simple tasks. Very cost-effective for basic completions.",
    category: "standard",
  },
  {
    id: "o1",
    name: "o1",
    provider: "OpenAI",
    providerSlug: "openai",
    inputCostPerMillion: 15.0,
    outputCostPerMillion: 60.0,
    cachedInputCostPerMillion: 7.5,
    contextWindow: 200000,
    description: "Advanced reasoning model for complex STEM, math, and coding problems.",
    releaseDate: "2024-12",
    category: "frontier",
  },
  {
    id: "o1-mini",
    name: "o1 Mini",
    provider: "OpenAI",
    providerSlug: "openai",
    inputCostPerMillion: 3.0,
    outputCostPerMillion: 12.0,
    cachedInputCostPerMillion: 1.5,
    contextWindow: 128000,
    description: "Affordable reasoning model for STEM tasks without extensive world knowledge.",
    releaseDate: "2024-09",
    category: "standard",
  },
  {
    id: "o3-mini",
    name: "o3 Mini",
    provider: "OpenAI",
    providerSlug: "openai",
    inputCostPerMillion: 1.1,
    outputCostPerMillion: 4.4,
    cachedInputCostPerMillion: 0.55,
    contextWindow: 200000,
    description: "Latest small reasoning model with strong coding and STEM performance.",
    releaseDate: "2025-01",
    isPopular: true,
    category: "efficient",
  },

  // Anthropic
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    providerSlug: "anthropic",
    inputCostPerMillion: 3.0,
    outputCostPerMillion: 15.0,
    cachedInputCostPerMillion: 0.3,
    contextWindow: 200000,
    description: "Best Claude model for coding and agentic tasks with extended thinking.",
    releaseDate: "2025-02",
    isPopular: true,
    category: "frontier",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    providerSlug: "anthropic",
    inputCostPerMillion: 3.0,
    outputCostPerMillion: 15.0,
    cachedInputCostPerMillion: 0.3,
    contextWindow: 200000,
    description: "Industry-leading coding and reasoning. Great for complex instructions.",
    releaseDate: "2024-10",
    isPopular: true,
    category: "frontier",
  },
  {
    id: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    providerSlug: "anthropic",
    inputCostPerMillion: 0.8,
    outputCostPerMillion: 4.0,
    cachedInputCostPerMillion: 0.08,
    contextWindow: 200000,
    description: "Fast and affordable. Best value in Claude family for high-volume tasks.",
    releaseDate: "2024-11",
    isPopular: true,
    category: "efficient",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    providerSlug: "anthropic",
    inputCostPerMillion: 15.0,
    outputCostPerMillion: 75.0,
    cachedInputCostPerMillion: 1.5,
    contextWindow: 200000,
    description: "Most powerful Claude model for complex analysis and long documents.",
    releaseDate: "2024-02",
    category: "frontier",
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    providerSlug: "anthropic",
    inputCostPerMillion: 0.25,
    outputCostPerMillion: 1.25,
    cachedInputCostPerMillion: 0.03,
    contextWindow: 200000,
    description: "Fastest Claude model. Ideal for real-time applications and simple tasks.",
    releaseDate: "2024-03",
    category: "efficient",
  },

  // Google
  {
    id: "gemini-2-0-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    providerSlug: "google",
    inputCostPerMillion: 0.1,
    outputCostPerMillion: 0.4,
    contextWindow: 1000000,
    description: "Next-gen efficiency with 1M context window. Fast multimodal model.",
    releaseDate: "2025-02",
    isPopular: true,
    category: "efficient",
  },
  {
    id: "gemini-2-0-flash-thinking",
    name: "Gemini 2.0 Flash Thinking",
    provider: "Google",
    providerSlug: "google",
    inputCostPerMillion: 0.15,
    outputCostPerMillion: 3.5,
    contextWindow: 1000000,
    description: "Reasoning variant of Flash. Shows thinking for complex problem solving.",
    releaseDate: "2025-02",
    category: "standard",
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    providerSlug: "google",
    inputCostPerMillion: 1.25,
    outputCostPerMillion: 5.0,
    contextWindow: 2000000,
    description: "2M context window. Exceptional for long documents and video analysis.",
    releaseDate: "2024-05",
    category: "frontier",
  },
  {
    id: "gemini-1-5-flash",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    providerSlug: "google",
    inputCostPerMillion: 0.075,
    outputCostPerMillion: 0.3,
    contextWindow: 1000000,
    description: "Speed-optimized model for high-frequency tasks at minimal cost.",
    releaseDate: "2024-05",
    category: "efficient",
  },

  // Meta
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 70B",
    provider: "Meta",
    providerSlug: "meta",
    inputCostPerMillion: 0.23,
    outputCostPerMillion: 0.4,
    contextWindow: 128000,
    description: "Best open-source model for instruction following and general tasks.",
    releaseDate: "2024-12",
    isPopular: true,
    category: "open-source",
  },
  {
    id: "llama-3-1-405b",
    name: "Llama 3.1 405B",
    provider: "Meta",
    providerSlug: "meta",
    inputCostPerMillion: 3.0,
    outputCostPerMillion: 3.0,
    contextWindow: 128000,
    description: "Frontier-class open source. Rivals GPT-4 for complex reasoning.",
    releaseDate: "2024-07",
    category: "open-source",
  },
  {
    id: "llama-3-2-90b",
    name: "Llama 3.2 90B Vision",
    provider: "Meta",
    providerSlug: "meta",
    inputCostPerMillion: 0.9,
    outputCostPerMillion: 0.9,
    contextWindow: 128000,
    description: "Multimodal model with vision capabilities for image understanding.",
    releaseDate: "2024-09",
    category: "open-source",
  },

  // Mistral
  {
    id: "mistral-large",
    name: "Mistral Large 2",
    provider: "Mistral",
    providerSlug: "mistral",
    inputCostPerMillion: 2.0,
    outputCostPerMillion: 6.0,
    contextWindow: 128000,
    description: "Top-tier reasoning in a lean package. Strong multilingual capabilities.",
    releaseDate: "2024-07",
    category: "frontier",
  },
  {
    id: "mistral-small",
    name: "Mistral Small 3",
    provider: "Mistral",
    providerSlug: "mistral",
    inputCostPerMillion: 0.1,
    outputCostPerMillion: 0.3,
    contextWindow: 32000,
    description: "Fast and affordable for simple tasks. Apache 2.0 license.",
    releaseDate: "2025-01",
    category: "efficient",
  },
  {
    id: "codestral",
    name: "Codestral",
    provider: "Mistral",
    providerSlug: "mistral",
    inputCostPerMillion: 0.2,
    outputCostPerMillion: 0.6,
    contextWindow: 32000,
    description: "Specialized for code completion and generation. Supports 80+ languages.",
    releaseDate: "2024-05",
    category: "standard",
  },

  // DeepSeek
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    providerSlug: "deepseek",
    inputCostPerMillion: 0.27,
    outputCostPerMillion: 1.1,
    cachedInputCostPerMillion: 0.07,
    contextWindow: 64000,
    description: "Best open-source model for coding. Beats GPT-4o on many benchmarks.",
    releaseDate: "2024-12",
    isPopular: true,
    category: "open-source",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    providerSlug: "deepseek",
    inputCostPerMillion: 0.55,
    outputCostPerMillion: 2.19,
    cachedInputCostPerMillion: 0.14,
    contextWindow: 64000,
    description: "Reasoning model rivaling o1. Transparent chain-of-thought reasoning.",
    releaseDate: "2025-01",
    isPopular: true,
    category: "open-source",
  },
  {
    id: "deepseek-chat",
    name: "DeepSeek V2.5",
    provider: "DeepSeek",
    providerSlug: "deepseek",
    inputCostPerMillion: 0.14,
    outputCostPerMillion: 0.28,
    contextWindow: 128000,
    description: "Efficient MoE architecture. Great performance-to-cost ratio.",
    releaseDate: "2024-09",
    category: "open-source",
  },

  // xAI
  {
    id: "grok-3",
    name: "Grok 3",
    provider: "xAI",
    providerSlug: "xai",
    inputCostPerMillion: 3.0,
    outputCostPerMillion: 15.0,
    contextWindow: 131072,
    description: "xAI's flagship model with real-time X/Twitter data access.",
    releaseDate: "2025-02",
    isPopular: true,
    category: "frontier",
  },
  {
    id: "grok-3-mini",
    name: "Grok 3 Mini",
    provider: "xAI",
    providerSlug: "xai",
    inputCostPerMillion: 0.3,
    outputCostPerMillion: 0.5,
    contextWindow: 131072,
    description: "Lightweight reasoning model with strong performance at low cost.",
    releaseDate: "2025-02",
    category: "efficient",
  },

  // Cohere
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "Cohere",
    providerSlug: "cohere",
    inputCostPerMillion: 2.5,
    outputCostPerMillion: 10.0,
    contextWindow: 128000,
    description: "Built for enterprise RAG and tool use. Strong retrieval augmentation.",
    releaseDate: "2024-04",
    category: "frontier",
  },
  {
    id: "command-r",
    name: "Command R",
    provider: "Cohere",
    providerSlug: "cohere",
    inputCostPerMillion: 0.15,
    outputCostPerMillion: 0.6,
    contextWindow: 128000,
    description: "Optimized for RAG at scale. Cost-effective retrieval-augmented generation.",
    releaseDate: "2024-03",
    category: "standard",
  },
];

export function getModelById(id: string): AIModel | undefined {
  return MODELS.find((m) => m.id === id);
}

export function getModelsByProvider(provider: string): AIModel[] {
  return MODELS.filter((m) => m.providerSlug === provider);
}

export function getPopularModels(): AIModel[] {
  return MODELS.filter((m) => m.isPopular);
}

export function calculateCost(
  model: AIModel,
  inputTokens: number,
  outputTokens: number,
  useCachedInput = false
): {
  inputCost: number;
  outputCost: number;
  totalCost: number;
} {
  const inputRate = useCachedInput && model.cachedInputCostPerMillion
    ? model.cachedInputCostPerMillion
    : model.inputCostPerMillion;

  const inputCost = (inputTokens / 1_000_000) * inputRate;
  const outputCost = (outputTokens / 1_000_000) * model.outputCostPerMillion;
  const totalCost = inputCost + outputCost;

  return { inputCost, outputCost, totalCost };
}

// Approximate tokens from text (GPT-style: ~4 chars/token)
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function formatCost(cost: number): string {
  if (cost === 0) return "$0.00";
  if (cost < 0.000001) return `$${cost.toExponential(2)}`;
  if (cost < 0.01) return `$${cost.toFixed(6)}`;
  if (cost < 1) return `$${cost.toFixed(4)}`;
  return `$${cost.toFixed(2)}`;
}

export function formatTokenCount(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
  if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(1)}K`;
  return tokens.toString();
}
