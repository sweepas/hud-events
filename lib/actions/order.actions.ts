import connectToDatabase from "../db";
import Order from "../db/models/order.model";
import { handleError } from "../utils"; 
import { CreateOrderParams } from "../../types/types";
import Category, { ICategory } from '../db/models/category.models';

export const createOrder = async (order: CreateOrderParams) => {
    try {
      await connectToDatabase();
      
      const newOrder = await Order.create({
        ...order,
        event: order.eventId,
        buyer: order.buyerId,
      });
  
      return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
      handleError(error);
    }
  }
  export const fetchUserOrders = async (userId: string) => {
    try {
      await connectToDatabase();
  
      const orders = await Order.find({ userId }).populate({
        path: 'eventId',
        populate: {
          path: 'category',
          model: 'Category',
        },
      });
  
      if (!orders) throw new Error('No orders found for the user');
  
      const upcomingEvents = orders
        .filter(order => new Date(order.eventInfo.date) > new Date())
        .map(order => JSON.parse(JSON.stringify(order.eventInfo)));
      const pastEvents = orders
        .filter(order => new Date(order.eventInfo.date) <= new Date())
        .map(order => JSON.parse(JSON.stringify(order.eventInfo)));
  
      return { upcomingEvents, pastEvents };
    } catch (error) {
      handleError(error);
      throw new Error('Failed to fetch user orders');
    }
  };