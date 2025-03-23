import type { Participant } from "@/lib/wars-data"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface ParticipantCardProps {
  participant: Participant
  totalVotes: number
}

export function ParticipantCard({ participant, totalVotes }: ParticipantCardProps) {
  // Ensure we're calculating with numbers and avoid division by zero
  const votePercentage = totalVotes > 0 ? Math.round((participant.votes / totalVotes) * 100) : 0

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300",
        participant.isChampion ? "border-2 border-amber-300 shadow-md" : "",
      )}
    >
      <div className="relative">
        {/* Cupcake Image */}
        <div className="relative h-64 w-full ">
          <Image
            src={participant.cupcake || "/placeholder.svg"}
            alt={participant.cupcakeTitle}
            fill
            className="object-cover"
          />
        </div>

        {participant.isChampion && (
          <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 rounded-full p-2 shadow-md flex items-center gap-1">
            <Trophy className="h-4 w-4" />
            <span className="font-medium text-sm">Champion</span>
          </div>
        )}

        {/* Participant Profile Image */}
        <div className="absolute -bottom-8 left-4 h-16 w-16 rounded-full border-4 border-white shadow-md overflow-hidden">
          <Image src={participant.image || "/placeholder.svg"} alt={participant.name} fill className="object-cover" />
        </div>
      </div>

      <CardContent className="p-6 pt-10">
        <div className="mb-4">
          <h3 className="text-xl font-medium mb-1">{participant.cupcakeTitle}</h3>
          <p className="text-sm text-muted-foreground">by {participant.name}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{participant.description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Votes</span>
            <span className="font-medium">
              {participant.votes} ({votePercentage}%)
            </span>
          </div>

          <div className="w-full bg-secondary rounded-full h-2.5">
            <div
              className={cn("h-2.5 rounded-full", participant.isChampion ? "bg-amber-500" : "bg-primary")}
              style={{ width: `${votePercentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

