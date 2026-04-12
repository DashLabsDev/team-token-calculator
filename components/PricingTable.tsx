"use client";

import { useState } from "react";
import { MODELS, PROVIDERS, formatTokenCount } from "@/lib/models";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronUp, ChevronDown } from "lucide-react";

type SortKey = "name" | "inputCostPerMillion" | "outputCostPerMillion" | "contextWindow";
type SortDir = "asc" | "desc";

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

export function PricingTable() {
  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("inputCostPerMillion");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = MODELS.filter((m) => {
    const matchesSearch =
      search === "" ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.provider.toLowerCase().includes(search.toLowerCase());
    const matchesProvider =
      providerFilter === "all" || m.providerSlug === providerFilter;
    return matchesSearch && matchesProvider;
  }).sort((a, b) => {
    const aVal = a[sortKey] ?? 0;
    const bVal = b[sortKey] ?? 0;
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDir === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    return sortDir === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === "asc" ? (
        <ChevronUp className="h-3.5 w-3.5 inline ml-1" />
      ) : (
        <ChevronDown className="h-3.5 w-3.5 inline ml-1" />
      )
    ) : (
      <ChevronDown className="h-3.5 w-3.5 inline ml-1 opacity-30" />
    );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search models..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Providers</option>
          {PROVIDERS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th
                  className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground whitespace-nowrap"
                  onClick={() => handleSort("name")}
                >
                  Model <SortIcon col="name" />
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                  Provider
                </th>
                <th
                  className="text-right px-4 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground whitespace-nowrap"
                  onClick={() => handleSort("inputCostPerMillion")}
                >
                  Input/1M <SortIcon col="inputCostPerMillion" />
                </th>
                <th
                  className="text-right px-4 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground whitespace-nowrap"
                  onClick={() => handleSort("outputCostPerMillion")}
                >
                  Output/1M <SortIcon col="outputCostPerMillion" />
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground whitespace-nowrap hidden md:table-cell">
                  Cached/1M
                </th>
                <th
                  className="text-right px-4 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground whitespace-nowrap hidden sm:table-cell"
                  onClick={() => handleSort("contextWindow")}
                >
                  Context <SortIcon col="contextWindow" />
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap hidden lg:table-cell">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((model) => (
                <tr
                  key={model.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{model.name}</span>
                      {model.isPopular && (
                        <span className="text-amber-500 text-xs">★</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 max-w-xs truncate hidden md:block">
                      {model.description}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${PROVIDER_COLORS[model.providerSlug] ?? ""}`}
                    >
                      {model.provider}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    ${model.inputCostPerMillion.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    ${model.outputCostPerMillion.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono hidden md:table-cell text-muted-foreground">
                    {model.cachedInputCostPerMillion != null
                      ? `$${model.cachedInputCostPerMillion.toFixed(2)}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell text-muted-foreground">
                    {formatTokenCount(model.contextWindow)}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {model.category}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 bg-muted/20 border-t border-border text-xs text-muted-foreground">
          Showing {filtered.length} of {MODELS.length} models · Prices in USD per million tokens
        </div>
      </div>
    </div>
  );
}
