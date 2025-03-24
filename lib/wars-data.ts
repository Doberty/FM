export type CompetitionStatus = "upcoming" | "ongoing" | "completed"

export interface CupcakeEntry {
  participantId: string
  cupcakeTitle: string
  description: string
  cupcakeImage: string
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
  entries?: CupcakeEntry[]
  rules?: CompetitionRule[]
  totalParticipants?: number
}

export const cupcakeCompetitions: CupcakeCompetition[] = [
  {
    id: "first-fiesta",
    title: "First Fiesta",
    date: "2025-03-28",
    description: "First ever cupcake war at F&M. No rules, no mercy, just cupcakes.",
    status: "ongoing",
    isSpecial: true,
    specialTheme: "First Edition",
    image: "/placeholder.svg?height=300&width=300",
    totalParticipants: 2,
    entries: [
      {
        participantId: "martina-roessler",
        cupcakeTitle: "TBD",
        description:
          "TBD",
        cupcakeImage: "/placeholder.svg?height=400&width=400",
        votes: 0,
        isChampion: false,
      },
      {
        participantId: "francisco-doberti",
        cupcakeTitle: "TBD ",
        description:
          "TBD",
        cupcakeImage: "/placeholder.svg?height=400&width=400",
        votes: 0,
      },
    ],
    rules: [
      {
        title: "Against the red",
        description: "No red velvet cupcakes allowed.",
      },
      {
        title: "In house cooking",
        description: "All cupcakes must be baked in the F&M kitchen.",
      },
      {
        title: "Presentation",
        description: "Cupcakes will be judged on appearance, creativity, and execution.",
      },
    ],
  },
  {
    id: "6-months-anniversary",
    title: "6 Months Anniversary",
    date: "2025-06-23",
    description:
      "Celebrate the 6-month anniversary of F&M with a special cupcake war. Participants must create a cupcake that represents the spirit of F&M.",
    status: "upcoming",
    isSpecial: true,
    specialTheme: "Anniversary Edition",
    image: "/placeholder.svg?height=300&width=300",
    totalParticipants: 2,
    entries: [
      {
        participantId: "martina-roessler",
        cupcakeTitle: "TBD",
        description:
          "TBD",
        cupcakeImage: "/placeholder.svg?height=400&width=400",
        votes: 0,
        isChampion: false,
      },
      {
        participantId: "francisco-doberti",
        cupcakeTitle: "TBD ",
        description:
          "TBD",
        cupcakeImage: "/placeholder.svg?height=400&width=400",
        votes: 0,
      },
    ],
    rules: [
      {
        title: "F&M Spirit",
        description: "Cupcakes must represent the spirit of F&M.",
      },
      {
        title: "Technique Showcase",
        description:
          "Participants should demonstrate at least one advanced chocolate technique (tempering, ganache, etc.).",
      },
      {
        title: "Presentation",
        description: "Cupcakes will be judged on appearance, creativity, and execution.",
      },
    ],
  },
  
]

export function getCompetitionById(id: string): CupcakeCompetition | undefined {
  return cupcakeCompetitions.find((competition) => competition.id === id)
}

