// import { NextResponse } from "next/server";
// import connectToDatabase from "../../../lib/db";
// import Event from "../../../lib/db/models/events.models";

// export async function GET() {
//   await connectToDatabase();

//   try {
//     const events = await Event.find();
//     return NextResponse.json(events);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
