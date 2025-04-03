import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ChefHat, Clock, Trophy, Package, Pizza, Cake } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import type { MasterChefCompetition } from "../lib/master-chef-data"
import React from "react"

interface MasterChefTimelineProps {
  competitions: MasterChefCompetition[]
}

export function MasterChefTimeline({ competitions }: MasterChefTimelineProps) {
  // Sort competitions by date (newest first)
  const sortedCompetitions = [...competitions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  if (sortedCompetitions.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No competitions available in this category.</div>
  }

  return (
    <div className="space-y-8">
      {sortedCompetitions.map((competition) => (
        <TimelineItem key={competition.id} competition={competition} />
      ))}
    </div>
  )
}

function TimelineItem({ competition }: { competition: MasterChefCompetition }) {
  // Format the date
  const formattedDate = format(new Date(competition.date), "MMMM d, yyyy")

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get competition icon
  function getCompetitionIcon(type: string) {
    switch (type) {
      case "mystery-box":
        return <Package className="h-4 w-4" />
      case "pizza-showdown":
        return <Pizza className="h-4 w-4" />
      case "pastry-competition":
        return <Cake className="h-4 w-4" />
      default:
        return <ChefHat className="h-4 w-4" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/cooking/master-chef/${competition.id}`} className="block">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Image (hidden on mobile) */}
            <div className="hidden md:block relative h-full min-h-[200px]">
              <Image
                src={competition.image || "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/masterchef-J5HKuckspbNEbaDZnrQsBp8toR2rRk.png"}
                alt={competition.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <span className="block text-lg font-bold">{formattedDate}</span>
                  {competition.timeLimit && (
                    <span className="flex items-center justify-center mt-2 text-sm">
                      <Clock className="h-4 w-4 mr-1" /> {competition.timeLimit} min
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:col-span-3">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className={getStatusColor(competition.status)}>
                  {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getCompetitionIcon(competition.type)}
                  {competition.type
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Badge>
                {competition.isSpecial && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    Special Event
                  </Badge>
                )}
                {competition.ingredients && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    {competition.ingredients.length} ingredients
                  </Badge>
                )}
              </div>

              {/* Date (visible only on mobile) */}
              <div className="md:hidden text-sm text-muted-foreground mb-2">
                {formattedDate}
                {competition.timeLimit && (
                  <span className="flex items-center text-xs mt-1">
                    <Clock className="h-3 w-3 mr-1" /> {competition.timeLimit} min
                  </span>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-2">{competition.title}</h3>
              <p className="text-muted-foreground mb-4">{competition.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {competition.totalParticipants && (
                  <div className="flex items-center">
                    <ChefHat className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{competition.totalParticipants} Participants</span>
                  </div>
                )}
                {competition.entries && competition.entries.find((entry) => entry.isWinner) && (
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-amber-500" />
                    <span>Winner Announced</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

