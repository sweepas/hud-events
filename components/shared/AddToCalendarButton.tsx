import React from "react";
import { IEvent } from "../../lib/db/models/events.models";
import { Button } from "../ui/button";

interface AddToCalendarButtonProps {
  event: IEvent;
}

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

const AddToCalendarButton: React.FC<AddToCalendarButtonProps> = ({ event }) => {
  const handleClick = () => {
    const url = generateGoogleCalendarUrl(event);
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
    >
      Add to Google Calendar
    </Button>
  );
};

export default AddToCalendarButton;
