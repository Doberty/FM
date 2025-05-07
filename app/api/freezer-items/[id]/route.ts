import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function PATCH(request: Request, context: { params: { id: string } }) {
  try {
    // Await the params object before accessing its properties
    const { id } = await context.params

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

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    // Await the params object before accessing its properties
    const { id } = await context.params

    const client = await clientPromise
    const db = client.db("FM")

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 })
    }

    // Get the request body
    const updateData = await request.json()

    // Fetch the existing item to ensure it exists
    const existingItem = await db.collection("items").findOne({ _id: new ObjectId(id) })

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Update the item with the new values
    // We're using $set to only update the fields provided in the request
    const result = await db.collection("items").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }, // Return the updated document
    )

    if (!result) {
      return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
    }

    // Format the response
    const updatedItem = {
      id: result._id.toString(),
      name: result.name,
      type: result.type,
      dateAdded: result.dateAdded,
      quantity: result.quantity,
      consumed: result.consumed,
      // Include any other fields that might be in the document
      ...Object.fromEntries(
        Object.entries(result).filter(
          ([key]) => !["_id", "name", "type", "dateAdded", "quantity", "consumed"].includes(key),
        ),
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

export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    // Await the params object before accessing its properties
    const { id } = await context.params

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
