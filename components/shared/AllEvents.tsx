"use client";

import Link from "next/link";
import { IEvent } from "../../lib/db/models/events.models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AllEvents = ({ events }: { events: IEvent[] }) => {
  if (!events || events.length === 0) {
    return <p>No events found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Link key={event._id as string} href={`/events/${event._id}`}>
            <Card>
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
