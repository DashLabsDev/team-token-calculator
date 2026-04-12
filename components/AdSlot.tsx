"use client";

interface AdSlotProps {
  slot: "top" | "mid" | "sidebar";
  className?: string;
}

export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const sizes: Record<string, string> = {
    top: "h-24 md:h-[90px]",
    mid: "h-24 md:h-[90px]",
    sidebar: "h-[250px] md:h-[600px]",
  };

  return (
    <div
      className={`w-full bg-muted/40 border border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-xs ${sizes[slot]} ${className}`}
      aria-label="Advertisement"
    >
      {/* Google AdSense — replace data-ad-client and data-ad-slot */}
      {/* <ins className="adsbygoogle" style={{ display: "block" }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="auto"
           data-full-width-responsive="true" /> */}
      <span>Advertisement</span>
    </div>
  );
}
