import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server"
import { z } from "zod"

const activitySchema = z.object({
  type: z.enum(["disco", "gym", "date"]),
  venue: z.string().min(1),
  description: z.string().min(1),
  date_added: z.string().datetime(),
})

export async function POST(request: Request) {
  try {

    const body = await request.json();
    
    const validatedData = activitySchema.parse(body);
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "FM");
    const activitiesCollection = db.collection("activities");
    
    const newActivity = {
      ...validatedData,
      created_at: new Date().toISOString(),
    };
    const result = await activitiesCollection.insertOne(newActivity);
    
    if (!result.acknowledged) {
      throw new Error("Failed to insert activity");
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Activity added successfully',
      activity: {
        ...newActivity,
        _id: result.insertedId
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error adding activity:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        message: 'Validation error', 
        errors: error.errors 
      }, { status: 400 });
    }
    
    // Handle other errors
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to add activity' 
    }, { status: 500 });
  }
}
