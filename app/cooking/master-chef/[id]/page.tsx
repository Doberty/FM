"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMasterChefCompetitionById } from "../../../../lib/master-chef-data"
import { ChefHat, Clock, Award, Users, Utensils, Timer, Lightbulb, Calendar, Trophy } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import React from "react"

export default function MasterChefCompetitionPage() {
  const params = useParams()
  const id = params.id as string
  const competition = getMasterChefCompetitionById(id)

  if (!competition) {
    return (
      <>
        <Header showBackButton={true} title="MASTER CHEF" />
        <main className="container mx-auto py-8 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Competition Not Found</h1>
            <p className="text-muted-foreground">The competition you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </main>
      </>
    )
  }

  // Find the winner if there is one
  const winner = competition.entries?.find((entry) => entry.isWinner)

  // Function to get the icon based on competition type
  const getCompetitionTypeIcon = (type: string) => {
    switch (type) {
      case "mystery-box":
        return <Utensils className="h-5 w-5" />
      case "pressure-test":
        return <Timer className="h-5 w-5" />
      case "team-challenge":
        return <Users className="h-5 w-5" />
      case "invention-test":
        return <Lightbulb className="h-5 w-5" />
      case "finale":
        return <Award className="h-5 w-5" />
      default:
        return <ChefHat className="h-5 w-5" />
    }
  }

  return (
    <>
      <Header showBackButton={true} title="MASTER CHEF" />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1",
                competition.type === "mystery-box"
                  ? "bg-purple-100 text-purple-700 border-purple-200"
                  : competition.type === "pizza-showdown"
                    ? "bg-red-100 text-red-700 border-red-200"
                    : competition.type === "pastry-competition"
                      ? "bg-blue-100 text-blue-700 border-blue-200"
                      : competition.type === "invention-test"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-amber-100 text-amber-700 border-amber-200",
              )}
            >
              {getCompetitionTypeIcon(competition.type)}
              {competition.type
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Badge>
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
            {competition.isSpecial && competition.specialTheme && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                {competition.specialTheme}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold">{competition.title}</h1>
          <p className="text-muted-foreground mt-2">{competition.description}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(competition.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            {competition.timeLimit && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {competition.timeLimit} minutes
              </div>
            )}
            {competition.totalParticipants && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {competition.totalParticipants} participants
              </div>
            )}
          </div>
        </div>

        {/* Competition Image */}
        <div className="mb-8">
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
            <Image
              src={competition.image || "/placeholder.svg"}
              alt={competition.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Winner Showcase (if competition is completed and has a winner) */}
        {competition.status === "completed" && winner && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Winner</h2>
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-500" />
                      {winner.dishTitle}
                    </CardTitle>
                    <CardDescription>by {winner.participantId}</CardDescription>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200">Score: {winner.score}/100</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 rounded-md overflow-hidden">
                    <Image
                      src={winner.dishImage || "/placeholder.svg"}
                      alt={winner.dishTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-4">{winner.description}</p>
                    {competition.trophyDetails && (
                      <div className="mt-4">
                        <h3 className="font-semibold text-amber-700 mb-2">Trophy: {competition.trophyDetails.name}</h3>
                        <p className="text-sm text-muted-foreground">{competition.trophyDetails.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Challenge Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Rules */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Rules</CardTitle>
            </CardHeader>
            <CardContent>
              {competition.rules ? (
                <ul className="space-y-4">
                  {competition.rules.map((rule, index) => (
                    <li key={index}>
                      <h3 className="font-semibold">{rule.title}</h3>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No rules specified for this competition.</p>
              )}
            </CardContent>
          </Card>

          {/* Mystery Box Ingredients (if applicable) */}
          {competition.type === "mystery-box" && competition.ingredients && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Mystery Box Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {competition.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-md text-center">
                      <Utensils className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <p className="font-medium">{ingredient}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Other competition types can have specific sections here */}
        </div>

        {/* Entries/Submissions */}
        {competition.entries && competition.entries.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Entries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competition.entries.map((entry, index) => (
                <Card key={index} className={entry.isWinner ? "border-amber-300" : ""}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={entry.dishImage || "/placeholder.svg"}
                      alt={entry.dishTitle}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    {entry.isWinner && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200 flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          Winner
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{entry.dishTitle}</CardTitle>
                    <CardDescription>by {entry.participantId}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{entry.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge
                        variant="outline"
                        className={
                          entry.score >= 90
                            ? "bg-green-100 text-green-700"
                            : entry.score >= 80
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-700"
                        }
                      >
                        Score: {entry.score}/100
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}

