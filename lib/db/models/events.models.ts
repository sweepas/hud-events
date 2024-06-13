import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description?: string;
  location?: string;
  created: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  capacity: string;
  isFree: boolean;
  url?: string;
  category: mongoose.Types.ObjectId;
  organizer: mongoose.Types.ObjectId;
}

const EventSchema: Schema<IEvent> = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  created: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  price: { type: String },
  capacity: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;