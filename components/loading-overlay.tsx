"use client"

interface LoadingOverlayProps {
  message?: string
  minimumDuration?: number
}

export function LoadingOverlay({ message = "Loading your DormieGO experience…" }: LoadingOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-background/60 backdrop-blur"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-primary/40 border-t-primary" />
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      </div>
      <span className="sr-only">Page content is loading</span>
    </div>
  )
}
