'use server'

import connectToDatabase from "../db";
import Event from "../db/models/events.models";

export const fetchEvent = async (id: string) => {
    await connectToDatabase();
  
    try {
      const event = await Event.findById(id).lean();
      if (!event) {
        return null;
      }
      return JSON.parse(JSON.stringify(event));
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  };


  export const fetchAllEvents = async () => {
    await connectToDatabase();
  
    try {
      const events = await Event.find().lean();
      return JSON.parse(JSON.stringify(events));
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };