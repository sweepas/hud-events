'use client'

import React, { useEffect, useState } from 'react';
import { fetchEvent } from "../../../../../lib/actions/events.actions";
import getUserInfoFromToken from "../../../../../lib/utils";
import EventForm from '../../../../../components/shared/EventForm';

type UpdateEventProps = {
  token: string ;
  params: {
    id: string;
};
}
const UpdateEvent: React.FC<UpdateEventProps> = ({ token, params: { id } }) => {
  const [event, setEvent] = useState(null); 
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      const fetchedEvent = await fetchEvent(id);
      setEvent(fetchedEvent);

      const userInfo = getUserInfoFromToken(token);
      if (userInfo) {
        setUserId(userInfo.userId);
      } else {
        console.log("Failed to decode token or token is null");
      }
    };

    fetchAndUpdate();
  }, [id, token]);

  if (!event) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm event={event} type="Update" userId={userId?? "defaultUserId"}/>
      </div>
    </>
  );
};

export default UpdateEvent;