import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "FM");

    const wars = await db
      .collection("wars")
      .find({})
      .toArray();

    const serializedWar = wars.map(wars => ({
      ...wars,
      _id: wars._id.toString(),
    }));

    return NextResponse.json(serializedWar);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}


