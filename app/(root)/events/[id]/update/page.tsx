"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchEvent } from "../../../../../lib/actions/events.actions";
import getUserInfoFromToken from "../../../../../lib/utils";
import EventForm from '../../../../../components/shared/EventForm';

const UpdateEvent: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null); 
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAndUpdate = async () => {
      if (id) {
        const fetchedEvent = await fetchEvent(id as string);
        setEvent(fetchedEvent);

        const token = fetchTokenFromLocalStorage();
        const userInfo = getUserInfoFromToken(token as string);
        if (userInfo) {
          setUserId(userInfo.userId);
        } else {
          console.log("Failed to decode token or token is null");
        }
      }
    };

    fetchAndUpdate();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm event={event} type="Update" userId={userId ?? "defaultUserId"} />
      </div>
    </>
  );
};

export default UpdateEvent;

const fetchTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
