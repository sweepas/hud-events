"use client";
import React, { useEffect, useState } from "react";
import {
  fetchEvent,
  getRelatedEventsByCategory,
} from "../../../../lib/actions/events.actions";
import Image from "next/image";
import getUserInfoFromToken, { formatDateTime } from "../../../../lib/utils";
import { Button } from "@/components/ui/button";
import AllEvents from "@/components/shared/AllEvents";
import CheckoutButton from "@/components/shared/CkeckoutButton";
import AddToCalendarButton from "@/components/shared/AddToCalendarButton";

interface EventHeroProps {
  params: {
    id: string;
  };
  searchParams: {
    page: string;
  };
}

const EventHero: React.FC<EventHeroProps> = ({
  params: { id },
  searchParams,
}) => {
  const [event, setEvent] = useState<any>(null);
  const [relatedEvents, setRelatedEvents] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const eventDetails = await fetchEvent(id);
      setEvent(eventDetails);

      const token = fetchTokenFromLocalStorage();
      setToken(token);
      const userInfo = token ? getUserInfoFromToken(token) : null;
      const result = userInfo?.userId;

      setUserId(userInfo?.userId as string);

      const relatedEventsData = await getRelatedEventsByCategory({
        categoryId: eventDetails.category._id,
        eventId: eventDetails._id,
        page: searchParams.page,
      });
      setRelatedEvents(relatedEventsData);
    };

    fetchEventDetails();
  }, [id, searchParams.page]);

  if (!event) return <div>Loading...</div>;

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <img
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold font-black">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500 font-black">
                    {event.organizer.username}
                  </span>
                </p>
              </div>
            </div>
            <CheckoutButton
              eventId={event._id}
              eventInfo={{
                title: event.title,
                price: event.price,
                isFree: event.isFree,
                date: new Date(event.startDateTime).toISOString(),
              }}
              userId={userId}
            />
            <AddToCalendarButton event={event}/>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/images/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  {"\xa0-\xa0"}
                  <p>
                    {" "}
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/images/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>
        <AllEvents
          events={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventHero;

const fetchTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
