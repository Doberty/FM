"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "../../../../components/header"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../components/ui/card"
import { getCompetitionById } from "@/lib/wars-data"
import { getParticipantById } from "@/lib/participants"
import { ArrowLeft, Calendar, Users, Trophy } from "lucide-react"
import { ParticipantCard } from "../../../../components/participant-card"
import { RulesSection } from "../../../../components/rules-section"
import { Badge } from "../../../../components/ui/badge"
import { cn } from "../../../../lib/utils"
import React from "react"

export default function CompetitionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const competition = getCompetitionById(id)

  if (!competition) {
    return (
      <>
        <Header showBackButton={true} title="COMPETITION NOT FOUND" />
        <main className="container mx-auto py-12 px-4 text-center">
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">The competition you&apos;re looking for doesn&apos;t exist.</p>
              <Button onClick={() => router.push("/cooking/cupcake-wars")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cupcake Wars
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    )
  }

  // Calculate total votes for percentage calculation
  const totalVotes = competition.entries?.reduce((sum, entry) => sum + entry.votes, 0) || 0

  // Find champion if exists
  const champion = competition.entries?.find((entry) => entry.isChampion)

  return (
    <>
      <Header showBackButton={true} title={competition.title.toUpperCase()} />
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Competition Overview */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <CardTitle className="text-2xl">{competition.title}</CardTitle>
                  <CardDescription className="mt-2">{competition.description}</CardDescription>
                </div>
                <Badge
                  className={cn(
                    "text-sm py-1 px-3",
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
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(competition.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {competition.totalParticipants && (
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Participants</p>
                      <p className="text-sm text-muted-foreground">{competition.totalParticipants} total</p>
                    </div>
                  </div>
                )}

                {competition.status === "completed" && champion && (
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Champion</p>
                      <p className="text-sm text-muted-foreground">
                        {getParticipantById(champion.participantId)?.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Participants Section */}
          {competition.entries && competition.entries.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">
                {competition.status === "completed" ? "Final Results" : "Current Standings"}
              </h2>
              <div
                className={`grid gap-6 ${
                  competition.entries.length === 2
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {competition.entries.map((entry, index) => (
                  <ParticipantCard
                    key={entry.participantId}
                    entry={entry}
                    totalVotes={totalVotes}
                    competitionId={competition.id}
                    competitionStatus={competition.status}
                    participantIndex={index}
                  />
                ))}
              </div>
            </div>
          )}



          {/* Rules Section */}
          {competition.rules && competition.rules.length > 0 && (
            <div className="mb-8">
              <RulesSection rules={competition.rules} />
            </div>
          )}

          <div className="flex justify-center">
            <Button onClick={() => router.push("/cooking/cupcake-wars")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cupcake Wars
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}


