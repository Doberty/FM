import type { Product } from "./types"

export const products: Product[] = [
  {
    id: "1",
    name: "Aperol Petit",
    price: 12.99,
    shortDescription: "Amado por Martina",
    description:
      "Our Classic Mojito combines fresh mint leaves, zesty lime juice, and premium white rum for a refreshing and invigorating experience. Topped with soda water and crushed ice for the perfect balance of sweet and sour.",
    ingredients: ["Aperol", "Champagne", "Sparkling water", "Ice"],
    recipe: [
      "1/4 oz Aperol",
      "2 1/4 oz Champagne",
      "Sparkling water",
      "Ice",

    ],
    imageUrl: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/Aperol%20Spritz_%20A%20Light%2C%20Citrusy%20Italian%20Cocktail%20-%20The%20Crafted%20Drink-SCsT4IGXeU1gNWeNEjughdPRf0nARk.jpg",
    dateAdded: "2023-09-15",
  },
  {
    id: "2",
    name: "Aperol Coconut Margarita",
    price: 14.99,
    shortDescription: "A tropical blend of Aperol, coconut, and tequila with a bittersweet citrus twist.",
    description:
      "The Aperol Coconut Margarita is a tropical twist on the classic margarita, blending the bittersweet citrus flavors of Aperol with the creamy richness of coconut and the bold kick of tequila. This vibrant cocktail offers a perfect balance of sweetness, tanginess, and a hint of bitterness, making it an irresistible choice for summer gatherings or a refreshing happy hour treat.",
    ingredients: [
      "0.75 oz Aperol",
      "1.5 oz Tequila",
      "1 oz Coconut puree",
      "0.75 oz Lime juice",
      "Ice",
      "Shreded lemon/lime zest",
    ],
    recipe: [
      "Rim you glass with shredded lemon or lime zest, using a bit of lemmon juice",
      "In a shaker, combine Aperol, tequila, coconut puree, and lime juice",
      "Add ice and stir until well-chilled",
      "Strain into your prepared glass over fresh ice",
      "Garish with a lime wheel or a lemon twist",
    ],
    imageUrl: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/Aperol%20Coconut%20Margarita%20-%20Join%20Jules-cw7L9a6ge4ncopqFCaS4IzPXEsnNcp.jpg",
    dateAdded: "2025-03-012",
  },
  {
    id: "3",
    name: "Le Violette",
    price: 13.99,
    shortDescription: "Tropical twist on a classic",
    description:
      "This tropical take on the classic Margarita blends premium tequila with fresh passion fruit puree and lime juice. The rim is dusted with a chili-salt mix for a sweet, sour, and spicy combination that transports you to a beachside paradise.",
    ingredients: [
      "Gin Tanqueray Royale",
      "Chambord",
      "Vilolet Liqueur",
      "Berry syrup",
      "Triple Sec",
      "Grapefruit juice",
      "Tonic water",
      "Ice",
    ],
    recipe: [
      "Rim a glass with chili-salt mixture",
      "In a shaker, combine tequila, passion fruit puree, lime juice, triple sec, and agave syrup",
      "Add ice and shake vigorously",
      "Strain into the prepared glass over fresh ice",
      "Garnish with a lime wheel or passion fruit half",
    ],
    imageUrl: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/Galaxy%20Margarita%20with%20Color%20Changing%20Tequila-lhXXojSM4p3rZIerCs8mq4P8C6fMZC.jpg",
    dateAdded: "2024-12-23",
 },
  {
    id: "4",
    name: "Espresso Martini",
    price: 15.99,
    shortDescription: "Rich coffee cocktail",
    description:
      "Our Espresso Martini combines freshly brewed espresso with premium vodka and coffee liqueur for a rich, indulgent experience. Shaken to perfection to create a silky foam top, this cocktail is the perfect pick-me-up.",
    ingredients: ["Premium Vodka", "Coffee Liqueur", "Fresh Espresso", "Simple Syrup", "Coffee Beans for Garnish"],
    recipe: [
      "Brew a shot of espresso and let it cool slightly",
      "In a shaker, combine vodka, coffee liqueur, espresso, and simple syrup",
      "Add ice and shake vigorously for at least 10 seconds",
      "Double strain into a chilled martini glass",
      "Garnish with three coffee beans on top of the foam",
    ],
    imageUrl: "/placeholder.svg?height=400&width=400",
    dateAdded: "2024-01-05",
  },
  {
    id: "5",
    name: "Berry Bramble",
    price: 13.99,
    shortDescription: "Gin-based berry delight",
    description:
      "Our Berry Bramble features premium gin, fresh lemon juice, and a mix of seasonal berries. The cocktail is built over crushed ice and drizzled with blackberry liqueur for a fruity, refreshing experience with a beautiful gradient effect.",
    ingredients: [
      "London Dry Gin",
      "Fresh Lemon Juice",
      "Simple Syrup",
      "Blackberry Liqueur",
      "Mixed Berries",
      "Crushed Ice",
    ],
    recipe: [
      "Fill a glass with crushed ice",
      "In a shaker, combine gin, lemon juice, and simple syrup",
      "Add ice and shake well",
      "Strain over the crushed ice",
      "Drizzle blackberry liqueur over the top",
      "Garnish with fresh berries and a lemon twist",
    ],
    imageUrl: "/placeholder.svg?height=400&width=400",
    dateAdded: "2024-02-12",
  },
  {
    id: "6",
    name: "Cucumber Basil Gimlet",
    price: 12.99,
    shortDescription: "Herbaceous and refreshing",
    description:
      "This refreshing twist on the classic Gimlet combines gin with muddled cucumber, fresh basil, and lime juice. The result is a light, herbaceous cocktail that's perfect for warm evenings or as an aperitif.",
    ingredients: ["Gin", "Fresh Cucumber", "Basil Leaves", "Lime Juice", "Simple Syrup", "Soda Top (Optional)"],
    recipe: [
      "Muddle cucumber and basil leaves in a shaker",
      "Add gin, lime juice, and simple syrup",
      "Fill with ice and shake vigorously",
      "Double strain into a chilled coupe glass",
      "Garnish with a cucumber ribbon and basil leaf",
      "Optional: Top with a splash of soda water",
    ],
    imageUrl: "/placeholder.svg?height=400&width=400",
    dateAdded: "2024-03-01",
  },
]

