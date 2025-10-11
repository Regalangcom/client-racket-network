"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  className?: string;
  text?: string;
}

export function Loading({ size = "md", variant = "spinner", className, text = "Loading..." }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const renderSpinner = () => (
    <div className={cn("animate-spin rounded-full border-2 border-gray-300 border-t-primary", sizeClasses[size], className)} />
  );

  const renderDots = () => (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-primary animate-pulse",
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => <div className={cn("rounded-full bg-primary animate-pulse", sizeClasses[size], className)} />;

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {renderLoader()}
      {text && <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>{text}</p>}
    </div>
  );
}

// Global loading overlay component
interface GlobalLoadingProps {
  isLoading: boolean;
  text?: string;
  variant?: "spinner" | "dots" | "pulse";
}

export function GlobalLoading({ isLoading, text = "Loading...", variant = "spinner" }: GlobalLoadingProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 p-6 bg-card rounded-lg shadow-lg border">
        <Loading size="lg" variant={variant} />
        <p className="text-lg font-medium text-foreground">{text}</p>
      </div>
    </div>
  );
}

// Page loading component
export function PageLoading({ text = "Loading page..." }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading size="lg" text={text} />
    </div>
  );
}

// Inline loading component
export function InlineLoading({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <Loading size="md" text={text} />
    </div>
  );
}
