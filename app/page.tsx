import { Calculator } from "@/components/Calculator";
import { PricingTable } from "@/components/PricingTable";
import { TipsSection } from "@/components/TipsSection";
import { AdSlot } from "@/components/AdSlot";
import { Badge } from "@/components/ui/badge";
import { MODELS } from "@/lib/models";

export default function Home() {
  const modelCount = MODELS.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-12 md:py-16 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {modelCount}+ Models
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Updated 2025
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Free Tool
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          AI Token Cost Calculator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Compare LLM pricing across {modelCount}+ models from OpenAI, Anthropic, Google, Meta, DeepSeek, and more.
          Calculate exactly what your AI workload will cost — before you build.
        </p>

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { label: "AI Models", value: `${modelCount}+` },
            { label: "Providers", value: "8" },
            { label: "Price Range", value: "100x+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8 items-start">
        <div className="space-y-12">
          {/* Calculator */}
          <section id="calculator">
            <Calculator />
          </section>

          {/* Pricing table */}
          <section id="pricing" className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">LLM Pricing Comparison Table</h2>
              <p className="text-muted-foreground mt-1">
                Full pricing breakdown for all {modelCount} models. Click column headers to sort.
              </p>
            </div>
            <PricingTable />
          </section>

          {/* Tips */}
          <section id="tips">
            <TipsSection />
          </section>

          {/* FAQ for SEO */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How much does GPT-4o cost per token?",
                  a: "GPT-4o costs $2.50 per million input tokens and $10.00 per million output tokens (as of 2025). With prompt caching enabled, input tokens cost $1.25 per million — a 50% discount. Most API calls use far fewer than a million tokens, so a typical 1,000-token request costs about $0.0025.",
                },
                {
                  q: "What's the cheapest AI model for production use?",
                  a: "For simple tasks like classification, summarization, and Q&A, Gemini 1.5 Flash ($0.075/M in), GPT-4o Mini ($0.15/M in), Claude 3.5 Haiku ($0.80/M in), and Mistral Small ($0.10/M in) offer excellent performance at low cost. DeepSeek V3 ($0.27/M in) and DeepSeek R1 ($0.55/M in) deliver frontier-class results at a fraction of the price.",
                },
                {
                  q: "How do I calculate AI API costs?",
                  a: "Multiply your input token count by the model's input rate per million tokens, then add the output tokens multiplied by the output rate. Example: 1,000 input tokens + 500 output tokens with GPT-4o = (1,000 × $2.50/1M) + (500 × $10.00/1M) = $0.0025 + $0.005 = $0.0075 per request.",
                },
                {
                  q: "What is prompt caching and how does it save money?",
                  a: "Prompt caching stores your system prompt and repeated context so subsequent API calls reuse it at 60-90% lower cost. If you have a long system prompt (1,000+ tokens) that stays the same across requests, caching can cut your overall bill by 30-70% depending on the input/output ratio.",
                },
                {
                  q: "How many tokens is 1,000 words?",
                  a: "Approximately 750 tokens for English text — or roughly 1 token per 1.3 words. Code tends to use more tokens per character than English prose. Our calculator estimates tokens at ~4 characters per token, which is accurate for typical mixed content.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block space-y-6 sticky top-20">
          <AdSlot slot="sidebar" />

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-sm">Quick Model Highlights</h3>
            {[
              { label: "🏆 Best Overall", model: "GPT-4o" },
              { label: "⚡ Fastest", model: "Gemini 2.0 Flash" },
              { label: "💰 Most Affordable", model: "Gemini 1.5 Flash" },
              { label: "🧠 Best Reasoning", model: "o1 / DeepSeek R1" },
              { label: "📖 Longest Context", model: "Gemini 1.5 Pro (2M)" },
              { label: "🔓 Best Open Source", model: "DeepSeek V3" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium text-xs">{item.model}</span>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-2">💡 Pro Tip</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For most production workloads, start with Claude 3.5 Haiku or
              GPT-4o Mini. They handle 80% of tasks at 10-20% the cost of
              frontier models.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
