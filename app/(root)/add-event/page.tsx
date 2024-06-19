"use client";

import EventForm from "@/components/shared/EventForm";
import { useEffect, useState } from "react";
import getUserInfoFromToken from "../../../lib/utils";
type CreateEventProps = {
  token: string ;
  params: {
    id: string;
};
}

const CreateEvent: React.FC<CreateEventProps>=({ token, params: { id } }) =>{
 
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchAndUpdate = async () => {
    

      const userInfo = getUserInfoFromToken(token);
      if (userInfo) {
        setUserId(userInfo.userId);
      } else {
        console.log("Failed to decode token or token is null");
      }
    };

    fetchAndUpdate();
  }, [id, token]);
  
  return (
    <div>
      <EventForm type="Create" userId={userId?? "defaultUserId"}/>
    </div>
  );
}

export default CreateEvent;