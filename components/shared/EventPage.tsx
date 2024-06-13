"use client";

import { IEvent } from "../../lib/db/models/events.models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EventPage = ({ event }: { event: IEvent | null }) => {
  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(event.startDateTime).toLocaleString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(event.endDateTime).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventPage;
