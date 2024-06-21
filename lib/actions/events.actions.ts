'use server'

import { GetAllEventsParams, GetRelatedEventsByCategoryParams } from "../../types/types";
import connectToDatabase from "../db";
import Category from "../db/models/category.models";
import Event from "../db/models/events.models";
import User from "../db/models/users.model";
import { handleError } from "../utils";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}
const populateEvent = (query: any) => {
  return query
    .populate({ path: 'organizer', model: User, select: '_id username' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

export const fetchEvent = async (id: string) => {
    await connectToDatabase();
  
   try {
    await connectToDatabase()

    const event = await populateEvent(Event.findById(id))

    if (!event) throw new Error('Event not found')
   
    
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
  };


  export async function fetchAllEvents ({ query, limit = 6, page, category }: GetAllEventsParams) {
    try {
      await connectToDatabase()
  
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = category ? await getCategoryByName(category) : null
      const conditions = {
        $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
      }
  
      const skipAmount = (Number(page) - 1) * limit
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(eventsCount / limit),
      }
    } catch (error) {
      handleError(error)
    }
  }
  
  export async function createEvent(eventData: any, userId: string) {
    await connectToDatabase();
    const event = new Event({ ...eventData, organizer: userId });
    await event.save();
    return event;
  }
  
  export async function updateEvent(eventData: any, eventId: string, userId: string) {
    await connectToDatabase();
    const event = await Event.findByIdAndUpdate(
      eventId,
      { ...eventData, organizer: userId },
      { new: true }
    );
    return event;
  }

  export async function getRelatedEventsByCategory({
    categoryId,
    eventId,
    limit = 3,
    page = 1,
  }: GetRelatedEventsByCategoryParams) {
    try {
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }
  
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }