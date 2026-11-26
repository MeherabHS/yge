"use client";

// shadcn/ui Sheet, restyled for YGE. Built on Radix Dialog: focus trap,
// Escape to close, scroll lock and focus return come from Radix.
import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import "./ui.css";

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(
  props: React.ComponentProps<typeof SheetPrimitive.Trigger>,
) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn("ui-sheet-overlay", className)}
      {...props}
    />
  );
}

type SheetSide = "top" | "right" | "bottom" | "left";

function SheetContent({
  className,
  children,
  side = "right",
  overlay = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: SheetSide;
  /** Set false for panels that sit under the site header without dimming it. */
  overlay?: boolean;
}) {
  return (
    <SheetPrimitive.Portal>
      {overlay && <SheetOverlay />}
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn("ui-sheet-content", className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

function SheetTitle(props: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" {...props} />;
}

function SheetDescription(
  props: React.ComponentProps<typeof SheetPrimitive.Description>,
) {
  return (
    <SheetPrimitive.Description data-slot="sheet-description" {...props} />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
};
