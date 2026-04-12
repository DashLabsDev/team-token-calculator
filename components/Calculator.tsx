"use client";

import { useState, useCallback } from "react";
import {
  MODELS,
  PROVIDERS,
  calculateCost,
  estimateTokens,
  formatCost,
  formatTokenCount,
  type AIModel,
} from "@/lib/models";
import { REAL_WORLD_EXAMPLES } from "@/lib/examples";
import { EmailGate } from "./EmailGate";
import { AdSlot } from "./AdSlot";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator as CalcIcon,
  ArrowLeftRight,
  Zap,
  Info,
  ChevronDown,
} from "lucide-react";

const PROVIDER_COLORS: Record<string, string> = {
  openai: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  anthropic: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  google: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  meta: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  mistral: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  deepseek: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  xai: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
  cohere: "bg-teal-500/10 text-teal-700 dark:text-teal-400",
};

function ModelSelect({
  value,
  onChange,
  label,
  excludeId,
}: {
  value: string;
  onChange: (id: string) => void;
  label: string;
  excludeId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = MODELS.filter(
    (m) =>
      m.id !== excludeId &&
      (search === "" ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.provider.toLowerCase().includes(search.toLowerCase()))
  );

  const grouped = PROVIDERS.map((p) => ({
    ...p,
    models: filtered.filter((m) => m.providerSlug === p.id),
  })).filter((g) => g.models.length > 0);

  const selected = MODELS.find((m) => m.id === value);

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
        {label}
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-input bg-background hover:bg-muted/50 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {selected ? (
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`text-xs px-1.5 py-0.5 rounded font-medium shrink-0 ${PROVIDER_COLORS[selected.providerSlug] ?? ""}`}
            >
              {selected.provider}
            </span>
            <span className="truncate font-medium">{selected.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">Select a model...</span>
        )}
        <ChevronDown className={`h-4 w-4 shrink-0 ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-popover border border-border rounded-lg shadow-xl max-h-72 overflow-hidden flex flex-col">
            <div className="p-2 border-b border-border">
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search models..."
                className="w-full px-2 py-1.5 text-sm bg-transparent focus:outline-none"
              />
            </div>
            <div className="overflow-y-auto">
              {grouped.map((group) => (
                <div key={group.id}>
                  <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/30 sticky top-0">
                    {group.name}
                  </div>
                  {group.models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        onChange(model.id);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted/50 transition-colors text-left ${
                        model.id === value ? "bg-primary/5 text-primary" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="truncate">{model.name}</span>
                        {model.isPopular && (
                          <span className="text-xs text-amber-500">★</span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">
                        ${model.inputCostPerMillion}/M in
                      </span>
                    </button>
                  ))}
                </div>
              ))}
              {grouped.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No models found
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TokenInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
        {label}
      </label>
      <input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        placeholder={placeholder ?? "0"}
        min={0}
        className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function ModelCard({
  model,
  inputTokens,
  outputTokens,
  useCached,
}: {
  model: AIModel;
  inputTokens: number;
  outputTokens: number;
  useCached: boolean;
}) {
  const { inputCost, outputCost, totalCost } = calculateCost(
    model,
    inputTokens,
    outputTokens,
    useCached
  );
  const perThousandRequests = totalCost * 1000;

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${PROVIDER_COLORS[model.providerSlug] ?? ""}`}
            >
              {model.provider}
            </span>
            {model.isPopular && (
              <Badge variant="outline" className="text-xs h-5">
                Popular
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs h-5 capitalize">
              {model.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-base mt-1.5">{model.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {model.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="bg-muted/40 rounded-lg p-2.5">
          <div className="font-medium text-foreground/70">Context</div>
          <div className="font-semibold text-foreground mt-0.5">
            {formatTokenCount(model.contextWindow)}
          </div>
        </div>
        <div className="bg-muted/40 rounded-lg p-2.5">
          <div className="font-medium text-foreground/70">Input / 1M</div>
          <div className="font-semibold text-foreground mt-0.5">
            ${model.inputCostPerMillion.toFixed(2)}
          </div>
        </div>
        <div className="bg-muted/40 rounded-lg p-2.5">
          <div className="font-medium text-foreground/70">Output / 1M</div>
          <div className="font-semibold text-foreground mt-0.5">
            ${model.outputCostPerMillion.toFixed(2)}
          </div>
        </div>
        {model.cachedInputCostPerMillion != null && (
          <div className="bg-muted/40 rounded-lg p-2.5">
            <div className="font-medium text-foreground/70">Cached / 1M</div>
            <div className="font-semibold text-foreground mt-0.5">
              ${model.cachedInputCostPerMillion.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Input cost</span>
          <span className="font-mono">{formatCost(inputCost)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Output cost</span>
          <span className="font-mono">{formatCost(outputCost)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold border-t border-border pt-2 mt-2">
          <span>Total per request</span>
          <span className="font-mono text-primary">{formatCost(totalCost)}</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Per 1,000 requests</span>
          <span className="font-mono">{formatCost(perThousandRequests)}</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Per 1M requests</span>
          <span className="font-mono">{formatCost(totalCost * 1_000_000)}</span>
        </div>
      </div>
    </div>
  );
}

export function Calculator() {
  const [model1Id, setModel1Id] = useState("gpt-4o");
  const [model2Id, setModel2Id] = useState("claude-3-5-sonnet");
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [pastedText, setPastedText] = useState("");
  const [useCached, setUseCached] = useState(false);
  const [activeTab, setActiveTab] = useState("tokens");

  const model1 = MODELS.find((m) => m.id === model1Id)!;
  const model2 = MODELS.find((m) => m.id === model2Id)!;

  const handleTextChange = useCallback((text: string) => {
    setPastedText(text);
    setInputTokens(estimateTokens(text));
  }, []);

  const loadExample = useCallback((example: (typeof REAL_WORLD_EXAMPLES)[0]) => {
    setInputTokens(example.inputTokens);
    setOutputTokens(example.outputTokens);
    setActiveTab("tokens");
  }, []);

  const swapModels = useCallback(() => {
    setModel1Id(model2Id);
    setModel2Id(model1Id);
  }, [model1Id, model2Id]);

  const cost1 = calculateCost(model1, inputTokens, outputTokens, useCached);
  const cost2 = calculateCost(model2, inputTokens, outputTokens, useCached);
  const cheaper = cost1.totalCost <= cost2.totalCost ? model1 : model2;
  const savingsPct =
    cost1.totalCost > 0 && cost2.totalCost > 0
      ? Math.round(
          (Math.abs(cost1.totalCost - cost2.totalCost) /
            Math.max(cost1.totalCost, cost2.totalCost)) *
            100
        )
      : 0;

  return (
    <div className="space-y-8">
      {/* Main Calculator Card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalcIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Token Cost Calculator</h2>
              <p className="text-sm text-muted-foreground">
                Compare real-time pricing across 25+ AI models
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Model selectors */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
            <ModelSelect
              value={model1Id}
              onChange={setModel1Id}
              label="Model A"
              excludeId={model2Id}
            />
            <button
              onClick={swapModels}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-input hover:bg-muted/50 transition-colors mx-auto"
              aria-label="Swap models"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
            <ModelSelect
              value={model2Id}
              onChange={setModel2Id}
              label="Model B"
              excludeId={model1Id}
            />
          </div>

          {/* Token input tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="tokens" className="flex-1 md:flex-none">
                Enter Tokens
              </TabsTrigger>
              <TabsTrigger value="text" className="flex-1 md:flex-none">
                Paste Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tokens" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TokenInput
                  label="Input Tokens"
                  value={inputTokens}
                  onChange={setInputTokens}
                  placeholder="e.g. 1000"
                />
                <TokenInput
                  label="Output Tokens"
                  value={outputTokens}
                  onChange={setOutputTokens}
                  placeholder="e.g. 500"
                />
              </div>
            </TabsContent>

            <TabsContent value="text" className="mt-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Paste your prompt text to estimate tokens
                </label>
                <textarea
                  value={pastedText}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Paste your prompt here..."
                  rows={5}
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                {pastedText && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ≈{" "}
                    <span className="font-medium text-foreground">
                      {inputTokens.toLocaleString()}
                    </span>{" "}
                    input tokens (estimated). Set output tokens below:
                  </p>
                )}
                {pastedText && (
                  <div className="mt-3">
                    <TokenInput
                      label="Expected Output Tokens"
                      value={outputTokens}
                      onChange={setOutputTokens}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Options */}
          <div className="flex items-center gap-3">
            <button
              role="switch"
              aria-checked={useCached}
              onClick={() => setUseCached(!useCached)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                useCached ? "bg-primary" : "bg-input"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                  useCached ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
            <label className="text-sm cursor-pointer" onClick={() => setUseCached(!useCached)}>
              Use cached input pricing
            </label>
            <div className="group relative">
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 text-xs bg-popover border border-border rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                Prompt caching reduces input costs by 60-90% for repeated context. Available on GPT-4o, Claude 3.5+, and DeepSeek.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <EmailGate>
        <div className="space-y-4">
          {/* Comparison badge */}
          {savingsPct > 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
              <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                <span className="font-semibold">{cheaper.name}</span> is{" "}
                <span className="font-semibold">{savingsPct}% cheaper</span> for
                this usage pattern.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ModelCard
              model={model1}
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              useCached={useCached}
            />
            <ModelCard
              model={model2}
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              useCached={useCached}
            />
          </div>
        </div>
      </EmailGate>

      {/* Mid Ad */}
      <AdSlot slot="mid" />

      {/* Quick Examples */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Real-World Cost Examples</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Click any example to load it into the calculator
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {REAL_WORLD_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => loadExample(ex)}
              className="text-left p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{ex.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">
                      {ex.name}
                    </span>
                    <Badge variant="outline" className="text-xs h-5">
                      {ex.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {ex.description}
                  </p>
                  <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                    <span>In: {formatTokenCount(ex.inputTokens)}</span>
                    <span>Out: {formatTokenCount(ex.outputTokens)}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
