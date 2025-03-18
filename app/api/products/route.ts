import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "FM")

    const products = await db.collection("products").find({}).sort({ dateAdded: -1 }).toArray()

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "FM")

    const product = await request.json()

    // Validate the product data
    if (!product.name || !product.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Add default values for new products
    const newProduct = {
      ...product,
      count: 0,
      dateAdded: new Date().toISOString(),
      id: crypto.randomUUID(),
    }

    await db.collection("products").insertOne(newProduct)

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

