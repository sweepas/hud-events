"use client";

import Link from "next/link";
import { IEvent } from "../../lib/db/models/events.models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Pagination from "./Pagination";

type EventsProps = {
  events: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};
const AllEvents = ({
  events,
  emptyTitle = "No events found",
  emptyStateSubtext = "Come back later",
  collectionType = "All_Events",
  limit,
  page,
  totalPages,
  urlParamName,
}: EventsProps) => {
  if (!events || events.length === 0) {
    return <p>No events found</p>;
  }

  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <li key={event._id as string}>
            <Link href={`/events/${event._id}`}>
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
                  <p>{event.id}</p>
                  <p>{event.description}</p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(event.startDateTime).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {new Date(event.endDateTime).toLocaleDateString()}
                  </p>
                  {event.category && (
                    <p>
                      <strong>Category:</strong> {event.category.name}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center">
        {" "}
        {totalPages && totalPages > 1 && (
          <Pagination
            urlParamName={urlParamName}
            page={page}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default AllEvents;
