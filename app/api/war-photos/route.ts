import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const warId = searchParams.get("warId")

  if (!warId) {
    return NextResponse.json({ error: "War ID is required" }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "FM")

    const photos = await db.collection("warphotos").find({ war_id: warId }).toArray()

    return NextResponse.json({ photos })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch war photos" }, { status: 500 })
  }
}

