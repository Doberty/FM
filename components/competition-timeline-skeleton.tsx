import { Skeleton } from "../components/ui/skeleton"
import React from "react"

export function CompetitionTimelineSkeleton() {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-border">
      {[1, 2, 3].map((item) => (
        <div key={item} className="relative pl-10">
          <Skeleton className="absolute left-0 h-8 w-8 rounded-full" />

          <div className="flex flex-col space-y-2 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>

            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-3/4 max-w-sm" />

            <div className="pt-2">
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
