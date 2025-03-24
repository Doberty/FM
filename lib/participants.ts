export interface Participant {
    id: string
    name: string
    image: string
    bio: string
    specialties: string[]
    funFacts: string[]
    socialMedia?: {
      instagram?: string
      twitter?: string
      tiktok?: string
    }
    achievements?: string[]
  }
  
  export const participants: Participant[] = [
    {
      id: "martina-roessler",
      name: "Martina Roessler",
      image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/participants/e5d6a8da-f2f6-4ff9-b5fa-dd570172ee38-aPJcno4dJYplX0Y5KrjsLEE1RKveks.JPG",
      bio: "Chef with a passion for innovative flavor combinations and artistic presentations.",
      specialties: ["Best cookies", "Indian food", "Baking"],
      funFacts: [
        "Started baking at age 3 with her mother",
        "Known for her sorrentinos alla butternut",
        "If beeing a nurse doesn't work out, she will be a chef",
      ],
      socialMedia: {
        instagram: "@martinaroessler",
        tiktok: "@martinaroessler",
      },
      achievements: [
        "Winner of Francisco's heart",
        "Author of many baking recipes",
      ],
    },
    {
      id: "francisco-doberti",
      name: "Francisco Doberti",
      image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/participants/IMG_0124-J1yBf0OoZFkZiOZ1ViquTmqAZqEClK.jpg",
      bio: "Self-taught baker who tries to not burn the kitchen down.",
      specialties: ["Pesto", "flan"],
      funFacts: [
        "Quit his job as a software engineer to pursue baking",
        "Can identify all coca-colas in a blind taste test",
        "Obsessed with Martina's cookies"
      ],
      socialMedia: {
        instagram: "@f_doberti",
        tiktok: "@doberti1",
      },
      achievements: [
        "Creator of this website",
        "Winner of Martina's heart",
      ],
    },
  ]
  
  export function getParticipantById(id: string): Participant | undefined {
    return participants.find((participant) => participant.id === id)
  }

  export function getParticipantsByIds(ids: string[]): Participant[] {
    return participants.filter((participant) => ids.includes(participant.id))
  }
  
  