import { COST_TIPS } from "@/lib/examples";
import { TrendingDown } from "lucide-react";

export function TipsSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <TrendingDown className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Reduce Your AI Token Costs</h2>
          <p className="text-sm text-muted-foreground">
            Proven strategies to cut LLM spend without sacrificing quality
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COST_TIPS.map((tip, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-5 space-y-3"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h3 className="font-semibold text-sm">{tip.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
            <div className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-lg">
              💰 {tip.savings}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
