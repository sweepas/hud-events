"use client";

import AllEvents from "@/components/shared/AllEvents";
import { fetchAllEvents } from "../../../lib/actions/events.actions";
import { useEffect, useState } from "react";
import { IEvent } from "../../../lib/db/models/events.models";

interface FetchAllEventsResponse {
  event: IEvent[];
  totalPages: number;
  count: number;
}

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const page = 1;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await fetchAllEvents({
          query: "",
          limit: 6,
          page: 1,
          category: "defaultCategory",
        });
        setEvents(fetchedEvents?.data || []);
        setTotalPages(fetchedEvents?.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <AllEvents
      events={events}
      emptyTitle="No Events Found"
      emptyStateSubtext="Come back later"
      collectionType="All_Events"
      limit={6}
      page={page}
      totalPages={totalPages}
    />
  );
};
export default EventsPage;
