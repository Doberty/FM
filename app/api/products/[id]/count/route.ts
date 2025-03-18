import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid Product ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "FM");
    const { action } = await request.json();

    let updateOperation;
    if (action === "increment") {
      updateOperation = { $inc: { count: 1 } };
    } else if (action === "reset") {
      updateOperation = { $set: { count: 0 } };
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    const query = { _id: new ObjectId(id) };

    const result = await db
      .collection("products")
      .findOneAndUpdate(query, updateOperation, { returnDocument: "after" });

    console.log("findOneAndUpdate result:", result);

    // Check if the update operation returned a result and a document
    if (!result || !result.value) {
      const updatedDoc = await db.collection("products").findOne(query);
      if (updatedDoc) {
        return NextResponse.json(updatedDoc);
      }
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.value);
  } catch (error) {
    console.error("Error updating product count:", error);
    return NextResponse.json(
      { error: "Failed to update product count" },
      { status: 500 }
    );
  }
}
