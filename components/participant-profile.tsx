"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Instagram, Twitter, Trophy } from "lucide-react"
import Image from "next/image"
import type { Participant } from "../lib/participants"
import React from "react"

interface ParticipantProfileProps {
  participant: Participant
  isOpen: boolean
  onClose: () => void
}

export function ParticipantProfile({ participant, isOpen, onClose }: ParticipantProfileProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={participant.image || "/placeholder.svg"}
                alt={participant.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <DialogTitle className="text-xl">{participant.name}</DialogTitle>
              <DialogDescription className="mt-1">{participant.bio}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="about" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="specialties">Specialties</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Fun Facts</h3>
              <ul className="space-y-2">
                {participant.funFacts.map((fact, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {participant.socialMedia && Object.keys(participant.socialMedia).length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Social Media</h3>
                <div className="flex flex-wrap gap-2">
                  {participant.socialMedia.instagram && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Instagram className="h-3 w-3" />
                      <span>{participant.socialMedia.instagram}</span>
                    </Badge>
                  )}
                  {participant.socialMedia.twitter && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Twitter className="h-3 w-3" />
                      <span>{participant.socialMedia.twitter}</span>
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="specialties" className="mt-4">
            <div className="grid grid-cols-1 gap-2">
              {participant.specialties.map((specialty, index) => (
                <Card key={index} className="bg-secondary/50">
                  <CardContent className="p-3">
                    <p className="text-sm">{specialty}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            {participant.achievements && participant.achievements.length > 0 ? (
              <ul className="space-y-3">
                {participant.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Trophy className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{achievement}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No achievements listed yet.</p>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

