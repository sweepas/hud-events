import mongoose, { Schema, Document, Model } from 'mongoose';
import Event, { IEvent } from './events.models'; 
import User, { IUser } from './users.model';

export interface IOrder extends Document {
  userId: IUser['_id'];
  eventId: IEvent['_id'];
  eventInfo: {
    title: IEvent['title'];
    price: IEvent['price'];
    isFree: IEvent['isFree'];
    date: IEvent['startDateTime'];
  };
  createdAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  eventInfo: {
    title: { type: String, required: true },
    price: { type: String},
    isFree: { type: Boolean},
    date: { type: Date},
  },
  createdAt: { type: Date, default: Date.now },
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
