"use client";

import EventForm from "@/components/shared/EventForm";
import { useEffect, useState } from "react";
import getUserInfoFromToken from "../../../lib/utils";
import { useRouter } from "next/navigation";

type CreateEventProps = {
  token: string;
};

const CreateEvent: React.FC<CreateEventProps> = ({ token }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAndUpdate = async () => {
      const otherToken = fetchTokenFromLocalStorage();
      const userInfo = getUserInfoFromToken(otherToken as string);

      if (!userInfo?.isStaff) {
        router.push("/unauthorized");
      }

      if (userInfo) {
        setUserId(userInfo.userId);
      } else {
        console.log("Failed to decode token or token is null");
      }
    };

    fetchAndUpdate();
  }, [token]);

  return (
    <div>
      <EventForm type="Create" userId={userId ?? "defaultUserId"} />
    </div>
  );
};

export default CreateEvent;

const fetchTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
