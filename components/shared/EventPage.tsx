"use client";

import { IEvent } from "../../lib/db/models/events.models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import getUserInfoFromToken, { formatDateTime } from "../../lib/utils";
import { ICategory } from "../../lib/db/models/category.models";
import Link from "next/link";
import Image from "next/image";

type EventProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
  token: string | null;
};
const EventPage = ({ event, hasOrderLink, hidePrice, token }: EventProps) => {
  const generateGoogleCalendarUrl = (event: IEvent) => {
    const startDate = new Date(event.startDateTime)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(event.endDateTime)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");

    const url = new URL("https://www.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", event.title);
    url.searchParams.set("details", event.description || "");
    url.searchParams.set("location", event.location || "");
    url.searchParams.set("dates", `${startDate}/${endDate}`);

    return url.toString();
  };

  const userInfo = token ? getUserInfoFromToken(token) : null;
  const isStaff = userInfo?.isStaff || false;
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {isStaff && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
