import connectToDatabase from '../../../../lib/db';
import Event from '../../../../lib/db/models/events.models';
import EventPage from '@/components/shared/EventPage';

const fetchEvent = async (id: string) => {
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

export default async function Page({ params }: { params: { id: string } }) {
  const event = await fetchEvent(params.id);
  return <EventPage event={event} />;
}
