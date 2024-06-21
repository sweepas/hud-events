import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../lib/db";
import Order from "../../../lib/db/models/order.model";
import getUserInfoFromToken from "../../../lib/utils";
interface PopulatedOrder {
  eventId: {
    _id: string;
    location: string;
    category: {
      name: string;
    };
  };
  eventInfo: {
    date: Date;
    title: string;
    description: string;
  };
}
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { success: false, message: "Authorization header missing" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const userInfo = getUserInfoFromToken(token);

  if (!userInfo?.userId) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }

  await connectToDatabase();

  try {
    const orders = await Order.find({ userId: userInfo.userId }).populate({
      path: "eventId",
      populate: {
        path: "category",
        model: "Category",
      },
    })as unknown as PopulatedOrder[];
    const upcomingEvents = orders
      .filter((order) => new Date(order.eventInfo.date) > new Date())
      .map((order) => ({
        ...order.eventInfo,
        startDateTime: order.eventInfo.date.toISOString(),
        _id: order.eventId._id,
        location: order.eventId.location,
      }));

    const pastEvents = orders
      .filter((order) => new Date(order.eventInfo.date) <= new Date())
      .map((order) => ({
        ...order.eventInfo,
        startDateTime: order.eventInfo.date.toISOString(),
        _id: order.eventId._id,
        location: order.eventId.location,
      }));

    return NextResponse.json(
      { success: true, upcomingEvents, pastEvents },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
