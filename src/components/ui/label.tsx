"use client";

// shadcn/ui Label, built on Radix Label (prevents text selection on
// double-click and keeps the native <label> association).
import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn("ui-label", className)}
      {...props}
    />
  );
}

export { Label };
