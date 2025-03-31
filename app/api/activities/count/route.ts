import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "FM");
    
    // Fetch and count cocktails from 'products' collection
    const productsCollection = db.collection("products");
    const products = await productsCollection.find({}).toArray();
    const totalCocktailsMade = products
      .filter((product) => product.type === "cocktail")
      .reduce((total, product) => total + (product.count || 0), 0);

    // Fetch and count activities from 'activities' collection
    const activitiesCollection = db.collection("activities");
    const activities = await activitiesCollection.find({}).toArray();
    
    const totalDiscoNights = activities.filter((activity) => activity.type === "disco").length;
    const totalGym = activities.filter((activity) => activity.type === "gym").length;
    const totalDates = activities.filter((activity) => activity.type === "date").length;

    return NextResponse.json({
      totalCocktailsMade,
      totalDiscoNights,
      totalGym,
      totalDates
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
