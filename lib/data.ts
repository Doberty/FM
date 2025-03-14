import type { Product } from "./types"

export const getProducts = (): Product[] => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const savedCounts = localStorage.getItem("productCounts")
      if (savedCounts) {
        const counts = JSON.parse(savedCounts)
        // Update the initial products with saved counts
        return initialProducts.map((product) => ({
          ...product,
          count: counts[product.id] || 0,
        }))
      }
    }
    return initialProducts
  }

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Aperol Petit",
    price: 12.99,
    shortDescription: "Amado por Martina",
    description:
      "Vibrant, refreshing, and unmistakably iconic—Aperol is the perfect balance of bittersweet citrus and herbal elegance. With its striking orange hue and smooth, slightly bitter flavor, this beloved Italian aperitif has been a staple of relaxed afternoons and lively evenings for over a century.",
    ingredients: ["Aperol", "Champagne", "Sparkling water", "Ice"],
    recipe: [
      "Add ice to a wine glass or a large tumbler until it's about ¾ full",
      "Add ¼ oz of Aperol over the ice.",
      "Gently pour in 2 ¼ oz of Champagne to keep the bubbles intact.",
      "Add a splash of sparkling water to taste, giving it a light, refreshing fizz.",

    ],
    imageUrl: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/Aperol%20Spritz_%20A%20Light%2C%20Citrusy%20Italian%20Cocktail%20-%20The%20Crafted%20Drink-SCsT4IGXeU1gNWeNEjughdPRf0nARk.jpg",
    dateAdded: "2024-011-15",
    type: "cocktail",
    count: 0,
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
      "1 oz Coconut cream",
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
    type: "cocktail",
    count: 0,
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
    type: "cocktail",
    count: 0,
 },
  {
    id: "4",
    name: "Pisco Sour",
    price: 15.99,
    shortDescription: "Rich coffee cocktail",
    description:
      "The Pisco Sour is a refreshing and elegant cocktail that showcases the versatility of pisco, a grape-based spirit. With a combination of fresh lime juice and simple syrup, it delivers a harmonious blend of tartness and sweetness. Finished with a touch of aromatic bitters, this timeless classic is the perfect choice for any occasion.",
    ingredients: ["Premium Vodka", "Coffee Liqueur", "Fresh Espresso", "Simple Syrup", "Coffee Beans for Garnish"],
    recipe: [
      "Brew a shot of espresso and let it cool slightly",
      "In a shaker, combine vodka, coffee liqueur, espresso, and simple syrup",
      "Add ice and shake vigorously for at least 10 seconds",
      "Double strain into a chilled martini glass",
      "Garnish with three coffee beans on top of the foam",
    ],
    imageUrl: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/Kit%20Pisco%20Sour-OH0yDtD2jYMXbKYsYI2DBflF59LYbX.jpg",
    dateAdded: "2024-01-05",
    type: "cocktail",
    count: 0,
  },
  {
    id: "7",
    name: "Patatas Bravas",
    price: 12.99,
    shortDescription: "Amado por Martina",
    description:
      "Vibrant, refreshing, and unmistakably iconic—Aperol is the perfect balance of bittersweet citrus and herbal elegance. With its striking orange hue and smooth, slightly bitter flavor, this beloved Italian aperitif has been a staple of relaxed afternoons and lively evenings for over a century.",
    ingredients: ["Aperol", "Champagne", "Sparkling water", "Ice"],
    recipe: [
      "Add ice to a wine glass or a large tumbler until it's about ¾ full",
      "Add ¼ oz of Aperol over the ice.",
      "Gently pour in 2 ¼ oz of Champagne to keep the bubbles intact.",
      "Add a splash of sparkling water to taste, giving it a light, refreshing fizz.",

    ],
    imageUrl: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/Patatas%20Bravas-dhhLh3TeB8E1mTaMHqHMRqTwgPiw5l.jpg",
    dateAdded: "2024-011-15",
    type: "tapas",
    count: 0,
  },
  {
    id: "8",
    name: "Orzo al pesto",
    price: 12.99,
    shortDescription: "Amado por Martina",
    description:
      "Vibrant, refreshing, and unmistakably iconic—Aperol is the perfect balance of bittersweet citrus and herbal elegance. With its striking orange hue and smooth, slightly bitter flavor, this beloved Italian aperitif has been a staple of relaxed afternoons and lively evenings for over a century.",
    ingredients: ["Aperol", "Champagne", "Sparkling water", "Ice"],
    recipe: [
      "Add ice to a wine glass or a large tumbler until it's about ¾ full",
      "Add ¼ oz of Aperol over the ice.",
      "Gently pour in 2 ¼ oz of Champagne to keep the bubbles intact.",
      "Add a splash of sparkling water to taste, giving it a light, refreshing fizz.",

    ],
    imageUrl: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/Patatas%20Bravas-dhhLh3TeB8E1mTaMHqHMRqTwgPiw5l.jpg",
    dateAdded: "2024-011-15",
    type: "tapas",
    count: 0,
  },
  {
    id: "9",
    name: "Queso crema con frutos secos",
    price: 12.99,
    shortDescription: "Amado por Martina",
    description:
      "Vibrant, refreshing, and unmistakably iconic—Aperol is the perfect balance of bittersweet citrus and herbal elegance. With its striking orange hue and smooth, slightly bitter flavor, this beloved Italian aperitif has been a staple of relaxed afternoons and lively evenings for over a century.",
    ingredients: ["Aperol", "Champagne", "Sparkling water", "Ice"],
    recipe: [
      "Add ice to a wine glass or a large tumbler until it's about ¾ full",
      "Add ¼ oz of Aperol over the ice.",
      "Gently pour in 2 ¼ oz of Champagne to keep the bubbles intact.",
      "Add a splash of sparkling water to taste, giving it a light, refreshing fizz.",

    ],
    imageUrl: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/Patatas%20Bravas-dhhLh3TeB8E1mTaMHqHMRqTwgPiw5l.jpg",
    dateAdded: "2024-011-15",
    type: "tapas",
    count: 0,
  },
]

