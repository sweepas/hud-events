

import AllEvents from "@/components/shared/AllEvents";
import { fetchAllEvents } from "../../../lib/actions/events.actions";
import Event from "../../../lib/db/models/events.models";

export default async function EventsPage() {
    const events = await fetchAllEvents();
    return <AllEvents events={events} />;
  }
  