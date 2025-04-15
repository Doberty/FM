import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function PATCH(request: Request, context: { params: { id: string } }) {
  try {
    const id = context.params.id
    const client = await clientPromise
    const db = client.db("FM")

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 })
    }

    const data = await request.json()

    // Update the item
    const result = await db.collection("items").updateOne({ _id: new ObjectId(id) }, { $set: data })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update freezer item" }, { status: 500 })
  }
}
