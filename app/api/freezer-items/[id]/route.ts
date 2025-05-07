import { NextResponse, NextRequest } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { 

  const { id } = await params
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


export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split("/").pop() || ""

    const client = await clientPromise
    const db = client.db("FM")

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 })
    }

    const updateData = await request.json()

    const existingItem = await db.collection("items").findOne({ _id: new ObjectId(id) })

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    const result = await db.collection("items").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    )

    if (!result) {
      return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
    }

    const updatedItem = {
      id: result._id.toString(),
      name: result.name,
      type: result.type,
      dateAdded: result.dateAdded,
      quantity: result.quantity,
      consumed: result.consumed,
      ...Object.fromEntries(
        Object.entries(result).filter(
          ([key]) => !["_id", "name", "type", "dateAdded", "quantity", "consumed"].includes(key),
        )
      ),
    }

    return NextResponse.json({
      success: true,
      item: updatedItem,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update freezer item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try { 

  const { id } = await params
  const client = await clientPromise
  const db = client.db("FM")

  // Validate ID format
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid item ID" }, { status: 400 })
  }

  // Delete the item
  const result = await db.collection("items").deleteOne({
    _id: new ObjectId(id),
  })

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
} catch (error) {
  console.error("Database error:", error)
  return NextResponse.json({ error: "Failed to delete freezer item" }, { status: 500 })
}
}