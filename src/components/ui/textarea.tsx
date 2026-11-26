// shadcn/ui Textarea. Page styles target the native <textarea> it renders.
import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn("ui-textarea", className)}
      {...props}
    />
  );
}

export { Textarea };
