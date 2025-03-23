export type CompetitionStatus = "upcoming" | "ongoing" | "completed"

export interface Participant {
  id: string
  name: string
  cupcakeTitle: string
  description: string
  cupcake: string
  image: string
  votes: number
  isChampion?: boolean
}

export interface CompetitionRule {
  title: string
  description: string
}

export interface CupcakeCompetition {
  id: string
  title: string
  date: string
  description: string
  status: CompetitionStatus
  isSpecial: boolean
  specialTheme?: string
  image?: string
  participants?: Participant[]
  rules?: CompetitionRule[]
  totalParticipants?: number
}

export const cupcakeCompetitions: CupcakeCompetition[] = [
  {
    id: "First-fiesta",
    title: "First Fiesta",
    date: "2025-03-29",
    description: "Fist ever cupcake war, no rules, no mercy and no quarter.",
    status: "ongoing",
    isSpecial: false,
    image: "/placeholder.svg?height=300&width=300",
    totalParticipants: 2,
    participants: [
      {
        id: "p1",
        name: "Francisco Doberti",
        cupcakeTitle: "TBD",
        description: "TBD",
        cupcake: "/placeholder.svg?height=400&width=400",
        image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/participants/IMG_0124-J1yBf0OoZFkZiOZ1ViquTmqAZqEClK.jpg",
        votes: 0,
        isChampion: false,
      },
      {
        id: "p2",
        name: "Martina Roessler",
        cupcakeTitle: "TBD",
        description:
          "TDB",
        cupcake: "/placeholder.svg?height=400&width=400",
        image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/participants/e5d6a8da-f2f6-4ff9-b5fa-dd570172ee38-aPJcno4dJYplX0Y5KrjsLEE1RKveks.JPG",
        votes: 0,
        isChampion: false,
      },
    ],
    rules: [
      {
        title: "Against The red",
        description: "No red velvet cupcakes allowed.",
      },
      {
        title: "In house cooking",
        description: "All cupcakes must be baked in the house.",
      },
      {
        title: "Creative Presentation",
        description: "Cupcakes will be judged on creativity and presentation.",
      },
    ],
  },
  {
    id: "christmas-sweet-2025",
    title: "Christmas Sweet",
    date: "2025-12-20",
    description: "Christmas special with festive cupcakes, traditional flavors, and holiday decorations.",
    status: "upcoming",
    isSpecial: true,
    specialTheme: "Christmas",
    image: "/placeholder.svg?height=300&width=300",
    rules: [
      {
        title: "Christmas Theme",
        description: "Cupcakes must visually represent Christmas themes.",
      },
      {
        title: "Traditional Flavors",
        description: "At least one traditional Christmas flavor must be incorporated.",
      },
      {
        title: "Festive Decoration",
        description: "Decorations should celebrate the holiday season.",
      },
      {
        title: "Technique Showcase",
        description: "At least one advanced decorating technique should be demonstrated.",
      },
    ],
  },
]

