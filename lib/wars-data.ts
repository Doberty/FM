export type CompetitionStatus = "upcoming" | "ongoing" | "completed"

export interface Participant {
  id: string
  name: string
  cupcakeTitle: string
  description: string
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
        id: "winter-wonderland-2023",
        title: "Winter Wonderland",
        date: "2023-12-15",
        description: "Create cupcakes inspired by winter landscapes and festive decorations.",
        status: "completed",
        isSpecial: true,
        specialTheme: "Christmas",
        image: "/placeholder.svg?height=300&width=300",
        totalParticipants: 24,
        participants: [
          {
            id: "p1",
            name: "Emma Johnson",
            cupcakeTitle: "Snowy Forest",
            description:
              "A vanilla cupcake with mint frosting, decorated with coconut flakes and sugar crystals to create a snowy forest scene with fondant trees.",
            image: "/placeholder.svg?height=400&width=400",
            votes: 156,
            isChampion: true,
          },
          {
            id: "p2",
            name: "Michael Chen",
            cupcakeTitle: "Peppermint Swirl",
            description:
              "Chocolate cupcake with peppermint buttercream frosting, topped with crushed candy canes and chocolate drizzle.",
            image: "/placeholder.svg?height=400&width=400",
            votes: 142,
          },
          {
            id: "p3",
            name: "Sophia Rodriguez",
            cupcakeTitle: "Gingerbread House",
            description:
              "Gingerbread cupcake with cinnamon cream cheese frosting, decorated with miniature gingerbread house elements and edible snow.",
            image: "/placeholder.svg?height=400&width=400",
            votes: 118,
          },
        ],
        rules: [
          {
            title: "Theme Adherence",
            description: "Cupcakes must visually represent the Winter Wonderland theme.",
          },
          {
            title: "Original Creation",
            description: "All decorations must be edible and made by the participant.",
          },
          {
            title: "Presentation",
            description: "Cupcakes will be judged on appearance, creativity, and execution.",
          },
          {
            title: "Taste",
            description: "Flavor profile should complement the winter theme.",
          },
        ],
      },
  {
    id: "First-fiesta",
    title: "First Fiesta",
    date: "2025-03-21",
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
        image: "/placeholder.svg?height=400&width=400",
        votes: 0,
      },
      {
        id: "p2",
        name: "Martina Roessler",
        cupcakeTitle: "TBD",
        description:
          "TDB",
        image: "/placeholder.svg?height=400&width=400",
        votes: 0,
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
    id: "halloween-spooktacular-2025",
    title: "Halloween Spooktacular",
    date: "2025-10-31",
    description: "Create the spookiest and most creative cupcakes for our Halloween competition.",
    status: "upcoming",
    isSpecial: true,
    specialTheme: "Halloween",
    image: "/placeholder.svg?height=300&width=300",
    rules: [
      {
        title: "Halloween Theme",
        description: "Cupcakes must represent Halloween themes (spooky, monsters, etc.).",
      },
      {
        title: "Creative Design",
        description: "Originality and creativity in design will be heavily weighted.",
      },
      {
        title: "Edible Elements",
        description: "All decorative elements must be edible.",
      },
      {
        title: "Flavor Profile",
        description: "Flavor should complement the Halloween theme.",
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

