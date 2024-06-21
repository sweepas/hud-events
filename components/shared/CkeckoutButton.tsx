"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

interface CheckoutButtonProps {
  eventId: string;
  eventInfo: {
    title: string;
    price: string;
    isFree: boolean;
    date: string; 
  };
  userId: string | null;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  eventId,
  eventInfo,
  userId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          eventId,
          eventInfo,
        }),
      });

      if (response.ok) {
        alert("Event added to your order history!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add event");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleBuy}
        disabled={loading}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Buy"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CheckoutButton;
