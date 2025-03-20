"use client"

import type { CupcakeCompetition } from "../lib/wars-data"
import { Badge } from "../components/ui/badge"
import { CalendarIcon, Trophy, Clock, Star, ChevronRight } from "lucide-react"
import { cn } from "../lib/utils"
import { useRouter } from "next/navigation"
import React from "react"

interface CompetitionTimelineProps {
  competitions: CupcakeCompetition[]
}

export function CompetitionTimeline({ competitions }: CompetitionTimelineProps) {
  const router = useRouter()

  // Sort competitions by date
  const sortedCompetitions = [...competitions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const handleCompetitionClick = (competition: CupcakeCompetition) => {
    if (competition.status === "upcoming") return
    router.push(`/cooking/cupcake-wars/${competition.id}`)
  }

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-border">
      {sortedCompetitions.map((competition) => (
        <div
          key={competition.id}
          className={cn(
            "relative pl-10",
            (competition.status === "ongoing" || competition.status === "completed") &&
              "cursor-pointer hover:bg-slate-50 rounded-md transition-colors",
          )}
          onClick={() => handleCompetitionClick(competition)}
        >
          <div
            className={cn(
              "absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border",
              competition.status === "upcoming"
                ? "bg-secondary"
                : competition.status === "ongoing"
                  ? "bg-blue-100"
                  : "bg-green-100",
            )}
          >
            {competition.status === "upcoming" ? (
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            ) : competition.status === "ongoing" ? (
              <Clock className="h-4 w-4 text-blue-600" />
            ) : (
              <Trophy className="h-4 w-4 text-green-600" />
            )}
          </div>

          <div className="flex flex-col space-y-2 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{competition.title}</h3>
                {competition.isSpecial && (
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1"
                  >
                    <Star className="h-3 w-3" />
                    {competition.specialTheme}
                  </Badge>
                )}
              </div>

              {(competition.status === "ongoing" || competition.status === "completed") && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <time className="text-sm text-muted-foreground">
              {new Date(competition.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <p className="text-sm text-muted-foreground">{competition.description}</p>

            {competition.participants && (
              <p className="text-xs text-muted-foreground">{competition.participants} participants</p>
            )}

            <div className="pt-2">
              <Badge
                className={cn(
                  competition.status === "upcoming"
                    ? "bg-secondary text-secondary-foreground"
                    : competition.status === "ongoing"
                      ? "bg-blue-100 text-blue-700 border-blue-200"
                      : "bg-green-100 text-green-700 border-green-200",
                )}
              >
                {competition.status === "upcoming"
                  ? "Upcoming"
                  : competition.status === "ongoing"
                    ? "Ongoing"
                    : "Completed"}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

