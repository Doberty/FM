import Image from "next/image"
import { Trophy } from "lucide-react"
import { competitions } from "@/lib/wars-data"
import { getParticipantById } from "@/lib/participants"

// Define the structure for a winner in our leaderboard
interface LeaderboardWinner {
  id: string
  name: string
  image: string
  wins: number
}

export function LeaderboardSection() {
  // Calculate the winners from all completed competitions
  const winners = calculateTopWinners()

  // If we don't have any winners yet, show a message
  if (winners.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No winners data available yet.</div>
  }

  return (
    <div className="py-6">
      <h3 className="text-xl font-semibold text-center mb-8">Top Cupcake Champions</h3>

      <div className="flex justify-center items-end gap-4 md:gap-8 h-[300px]">
        {/* 2nd Place */}
        {winners.length >= 2 && (
          <div className="flex flex-col items-center">
            <div className="relative h-20 w-20 md:h-24 md:w-24 mb-4">
              <Image
                src={winners[1].image || "/placeholder.svg"}
                alt={winners[1].name}
                fill
                className="object-cover rounded-full border-4 border-gray-200"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                2
              </div>
            </div>
            <div className="h-[140px] w-24 bg-gray-100 rounded-t-lg flex flex-col items-center justify-end p-2">
              <p className="font-medium text-sm text-center line-clamp-1">{winners[1].name}</p>
              <div className="flex items-center mt-1 text-gray-600">
                <Trophy className="h-3 w-3 mr-1 text-gray-400" />
                <span className="text-xs">{winners[1].wins} wins</span>
              </div>
            </div>
          </div>
        )}

        {/* 1st Place */}
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-24 md:h-32 md:w-32 mb-4">
            <Image
              src={winners[0].image || "/placeholder.svg"}
              alt={winners[0].name}
              fill
              className="object-cover rounded-full border-4 border-amber-300"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
              1
            </div>
          </div>
          <div className="h-[180px] w-28 bg-amber-50 rounded-t-lg flex flex-col items-center justify-end p-2">
            <p className="font-medium text-center line-clamp-1">{winners[0].name}</p>
            <div className="flex items-center mt-1 text-amber-700">
              <Trophy className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-sm">{winners[0].wins} wins</span>
            </div>
          </div>
        </div>

        {/* 3rd Place */}
        {winners.length >= 3 && (
          <div className="flex flex-col items-center">
            <div className="relative h-16 w-16 md:h-20 md:w-20 mb-4">
              <Image
                src={winners[2].image || "/placeholder.svg"}
                alt={winners[2].name}
                fill
                className="object-cover rounded-full border-4 border-amber-100"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                3
              </div>
            </div>
            <div className="h-[120px] w-24 bg-amber-50/50 rounded-t-lg flex flex-col items-center justify-end p-2">
              <p className="font-medium text-sm text-center line-clamp-1">{winners[2].name}</p>
              <div className="flex items-center mt-1 text-amber-600">
                <Trophy className="h-3 w-3 mr-1 text-amber-300" />
                <span className="text-xs">{winners[2].wins} wins</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to calculate the top winners
function calculateTopWinners(): LeaderboardWinner[] {
  // Get all completed competitions
  const completedCompetitions = competitions.filter((comp) => comp.status === "completed")

  // Create a map to track winners and their win counts
  const winnerMap = new Map<string, LeaderboardWinner>()

  // Go through each competition and count wins
  completedCompetitions.forEach((competition) => {
    if (competition.entries) {
      const champion = competition.entries.find((entry) => entry.isChampion)

      if (champion) {
        const participant = getParticipantById(champion.participantId)

        if (participant) {
          if (winnerMap.has(participant.id)) {
            // Increment wins for existing winner
            const existingWinner = winnerMap.get(participant.id)!
            existingWinner.wins += 1
            winnerMap.set(participant.id, existingWinner)
          } else {
            // Add new winner
            winnerMap.set(participant.id, {
              id: participant.id,
              name: participant.name,
              image: participant.image,
              wins: 1,
            })
          }
        }
      }
    }
  })

  // Convert map to array, sort by wins, and take top 3
  return Array.from(winnerMap.values())
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 3)
}

