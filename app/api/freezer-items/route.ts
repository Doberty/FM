import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "FM")

    const items = await db.collection("items").find({}).sort({ dateAdded: -1 }).toArray()

    // Convert MongoDB _id to id for client-side use
    const formattedItems = items.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      type: item.type,
      dateAdded: item.dateAdded,
      quantity: item.quantity,
      consumed: item.consumed,
    }))

    return NextResponse.json(formattedItems)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch freezer items" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "FM")

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.type) {
      return NextResponse.json({ error: "Name and type are required" }, { status: 400 })
    }

    // Prepare item for insertion
    const newItem = {
      name: data.name,
      type: data.type,
      dateAdded: new Date(data.dateAdded || new Date()),
      quantity: data.quantity || null,
      consumed: false,
    }

    const result = await db.collection("items").insertOne(newItem)

    return NextResponse.json(
      {
        id: result.insertedId.toString(),
        ...newItem,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to add freezer item" }, { status: 500 })
  }
}
