"use client";

import { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmailGateProps {
  children: React.ReactNode;
}

export function EmailGate({ children }: EmailGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ai-calc-email");
    if (stored) setUnlocked(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate brief network pause for UX
    await new Promise((r) => setTimeout(r, 600));
    localStorage.setItem("ai-calc-email", email);
    setUnlocked(true);
    setLoading(false);
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="blur-sm pointer-events-none select-none opacity-60">
        {children}
      </div>

      {/* Gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Unlock Full Comparison</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your email for free access to detailed cost breakdowns and side-by-side model comparisons.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            {error && <p className="text-xs text-red-500 text-left">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Unlocking..." : "Get Free Access"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
