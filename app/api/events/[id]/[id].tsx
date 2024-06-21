import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../../lib/db";
import Event from "../../../../lib/db/models/events.models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      return res.status(200).json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
