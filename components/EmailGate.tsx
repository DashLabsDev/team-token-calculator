"use client";

import { ReactNode } from "react";

interface EmailGateProps {
  children: ReactNode;
}

// Email gate removed — it was blocking the core value prop before showing any results.
// Users came to see cost comparisons, not to hand over email.
// Post-launch: consider email capture via newsletter signup in footer instead.

export function EmailGate({ children }: EmailGateProps) {
  // Gate disabled — pass through all content
  return <>{children}</>;
}
