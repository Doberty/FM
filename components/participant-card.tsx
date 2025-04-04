"use client"

import { useState } from "react"
import type { CompetitionEntry } from "@/lib/wars-data"
import { getParticipantById } from "@/lib/participants"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Trophy, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ParticipantProfile } from "../components/participant-profile"

interface ParticipantCardProps {
  entry: CompetitionEntry
  totalVotes: number
  competitionId: string
  competitionStatus: "upcoming" | "ongoing" | "completed"
  participantIndex: number
}

export function ParticipantCard({
  entry,
  totalVotes,
}: ParticipantCardProps) {
  const [showProfile, setShowProfile] = useState(false)

  // Get participant data from the participants collection
  const participant = getParticipantById(entry.participantId)

  if (!participant) {
    return <div>Participant not found</div>
  }

  // Ensure we're calculating with numbers and avoid division by zero
  const votePercentage = totalVotes > 0 ? Math.round((entry.votes / totalVotes) * 100) : 0

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300",
          entry.isChampion ? "border-2 border-amber-300 shadow-md" : "",
        )}
      >
        <div className="relative">
          {/* Cupcake Image */}
          <div className="relative h-64 w-full">
            <Image
              src={entry.dishImage || "/placeholder.svg"}
              alt={entry.dishTitle}
              fill
              className="object-cover"
            />
          </div>

          {entry.isChampion && (
            <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 rounded-full p-2 shadow-md flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              <span className="font-medium text-sm">Champion</span>
            </div>
          )}

          {/* Participant Profile Image */}
          <div
            className="absolute -bottom-8 left-4 h-16 w-16 rounded-full border-4 border-white shadow-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
            onClick={() => setShowProfile(true)}
          >
            <Image src={participant.image || "/placeholder.svg"} alt={participant.name} fill className="object-cover" />
          </div>
        </div>

        <CardContent className="p-6 pt-10">
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-1">{entry.dishTitle}</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">by {participant.name}</p>
              <Button variant="default" size="sm"  className="h-8 px-2 text-xs" onClick={() => setShowProfile(true)}>
                <User className="h-3 w-3 mr-1" />
                Profile
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">{entry.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Votes</span>
              <span className="font-medium">
                {entry.votes} ({votePercentage}%)
              </span>
            </div>

            <div className="w-full bg-secondary rounded-full h-2.5">
              <div
                className={cn("h-2.5 rounded-full", entry.isChampion ? "bg-amber-500" : "bg-primary")}
                style={{ width: `${votePercentage}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {participant && (
        <ParticipantProfile participant={participant} isOpen={showProfile} onClose={() => setShowProfile(false)} />
      )}
    </>
  )
}

