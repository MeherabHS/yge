"use client";

// shadcn/ui Toggle Group, restyled for YGE. Built on Radix Toggle Group:
// arrow-key roving focus and correct pressed/checked state for screen readers.
import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import "./ui.css";

function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn("ui-toggle-group", className)}
      {...props}
    />
  );
}

function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn("ui-toggle-group-item", className)}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
