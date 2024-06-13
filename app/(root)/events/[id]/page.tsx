import connectToDatabase from "../../../../lib/db";
import Event from "../../../../lib/db/models/events.models";
import EventPage from "@/components/shared/EventPage";
import { fetchEvent } from "../../../../lib/actions/events.actions";

export default async function EventHero({
  params,
}: {
  params: { id: string };
}) {
  const event = await fetchEvent(params.id);
  return <EventPage event={event} />;
}
