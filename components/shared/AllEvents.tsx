"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IEvent } from "../../lib/db/models/events.models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AllEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => {
          console.log(typeof event._id);

          return (
            <Link key={event.id} href={`/events/${event._id}`}>
              <Card className="cursor-pointer">
                <CardHeader>
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover mb-4"
                  />
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
          );
        })}
      </div>
    </div>
  );
};

export default AllEvents;
