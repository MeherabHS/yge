// shadcn/ui Input. Unstyled by default here: the page's own field styles
// (contact lines, filter bars) target the native <input> it renders.
import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn("ui-input", className)}
      {...props}
    />
  );
}

export { Input };
