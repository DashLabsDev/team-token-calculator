export interface RealWorldExample {
  id: string;
  name: string;
  description: string;
  inputTokens: number;
  outputTokens: number;
  icon: string;
  category: string;
}

export const REAL_WORLD_EXAMPLES: RealWorldExample[] = [
  {
    id: "summarize-article",
    name: "Summarize a news article",
    description: "Read a 1,500-word article and generate a 3-paragraph summary",
    inputTokens: 2000,
    outputTokens: 300,
    icon: "📰",
    category: "Content",
  },
  {
    id: "code-review",
    name: "Code review (small PR)",
    description: "Review 200 lines of Python code and provide feedback",
    inputTokens: 3000,
    outputTokens: 800,
    icon: "🔍",
    category: "Development",
  },
  {
    id: "chatbot-turn",
    name: "Single chatbot conversation turn",
    description: "Average user message + response with minimal context",
    inputTokens: 500,
    outputTokens: 250,
    icon: "💬",
    category: "Chatbot",
  },
  {
    id: "legal-doc",
    name: "Analyze a legal document",
    description: "Review a 10-page contract and extract key terms",
    inputTokens: 8000,
    outputTokens: 1500,
    icon: "⚖️",
    category: "Legal",
  },
  {
    id: "email-draft",
    name: "Draft a professional email",
    description: "Write a follow-up email from brief bullet points",
    inputTokens: 200,
    outputTokens: 300,
    icon: "✉️",
    category: "Writing",
  },
  {
    id: "generate-tests",
    name: "Generate unit tests",
    description: "Write unit tests for a 100-line TypeScript function",
    inputTokens: 1500,
    outputTokens: 2000,
    icon: "🧪",
    category: "Development",
  },
  {
    id: "rag-query",
    name: "RAG document query",
    description: "Query with 5 retrieved chunks (typical enterprise search)",
    inputTokens: 4000,
    outputTokens: 500,
    icon: "🔎",
    category: "Enterprise",
  },
  {
    id: "translate-page",
    name: "Translate a web page",
    description: "Translate a 500-word marketing page from English to Spanish",
    inputTokens: 1000,
    outputTokens: 1100,
    icon: "🌐",
    category: "Translation",
  },
  {
    id: "sentiment-batch",
    name: "Sentiment analysis (100 reviews)",
    description: "Classify sentiment for 100 product reviews",
    inputTokens: 5000,
    outputTokens: 200,
    icon: "⭐",
    category: "Analytics",
  },
  {
    id: "full-book",
    name: "Summarize an entire book",
    description: "Summarize a 300-page novel (~90,000 words)",
    inputTokens: 120000,
    outputTokens: 2000,
    icon: "📚",
    category: "Content",
  },
];

export const COST_TIPS = [
  {
    title: "Use prompt caching",
    description:
      "Repeat system prompts and context cost 60-90% less with caching. Ideal for multi-turn conversations and RAG systems.",
    icon: "💾",
    savings: "Up to 90% on repeated context",
  },
  {
    title: "Choose the right model size",
    description:
      "Simple classification, extraction, and summarization don't need frontier models. GPT-4o Mini or Claude Haiku handle most tasks at 10-20x lower cost.",
    icon: "📏",
    savings: "Up to 95% on simple tasks",
  },
  {
    title: "Compress your prompts",
    description:
      "Remove filler words, use structured formats instead of paragraphs, and avoid repeating instructions already in the system prompt.",
    icon: "🗜️",
    savings: "10-30% reduction in input tokens",
  },
  {
    title: "Stream and stop early",
    description:
      "Use streaming with a stop token to halt generation once the model has answered your question — you're billed only for generated tokens.",
    icon: "⏹️",
    savings: "Varies — big for long responses",
  },
  {
    title: "Batch offline workloads",
    description:
      "OpenAI and Anthropic offer 50% discounts on async batch processing. Great for bulk classification, embeddings, and data enrichment.",
    icon: "📦",
    savings: "50% on batch API",
  },
  {
    title: "Use structured outputs",
    description:
      "JSON mode and constrained decoding reduce output tokens by eliminating verbose explanations when you only need structured data.",
    icon: "📋",
    savings: "20-60% on output tokens",
  },
];
