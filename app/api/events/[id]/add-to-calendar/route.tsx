// import { NextApiRequest, NextApiResponse } from "next";
// import { fetchEvent } from "../../../../../lib/actions/events.actions";
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;

//   if (!id || typeof id !== "string") {
//     return res.status(400).json({ error: "Invalid event ID" });
//   }

//   const event = await fetchEvent(id);

//   if (!event) {
//     return res.status(404).json({ error: "Event not found" });
//   }

//   return res.status(200).json(event);
// }
