"use client";

import React, { useEffect, useState } from "react";
import { IEvent } from "../../../lib/db/models/events.models";
import getUserInfoFromToken from "../../../lib/utils";
import ErrorBoundary from "@/components/shared/ErrorBoundry";
import { formatDateTime } from "../../../lib/utils"; // Import your utility function
import Link from "next/link";

const ProfilePage: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<IEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch orders");
          setLoading(false);
          return;
        }

        const data = await response.json();
       

        setUpcomingEvents(data.upcomingEvents);
        setPastEvents(data.pastEvents);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">My Events</h1>
        <section>
          <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
          <ul>
            {upcomingEvents.map((event) => {
              const formatted = formatDateTime(event.startDateTime.toString());

              return (
                <li key={event.id} className="mb-4">
                  <Link href={`/events/${event._id}`}>
                    <div className="p-4 border rounded-lg bg-gray-100 hover:shadow-lg hover:shadow-sky-700 transition-shadow duration-300">
                      <h3 className="text-lg font-bold">{event.title}</h3>
                      <p>{formatted.dateTime}</p>
                      <p>{event.location}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">Event History</h2>
          <ul>
            {pastEvents.map((event) => {
              const formatted = formatDateTime(event.startDateTime.toString());

              return (
                <li key={event.id} className="mb-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p>{formatted.dateTime}</p>
                    <p>{event.location}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </ErrorBoundary>
  );
};

export default ProfilePage;
