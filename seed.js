const mongoose = require('mongoose');
const Event = require('./lib/db/models/events.model'); // Corrected path
const User = require('./lib/db/models/users.model');
const Category = require('./lib/db/models/category.model'); // Corrected path
const connectToDatabase = require('./lib/db');


const sampleImageUrls = [
  'https://via.placeholder.com/150/0000FF/808080?text=Event+1',
  'https://via.placeholder.com/150/FF0000/FFFFFF?text=Event+2',
  'https://via.placeholder.com/150/FFFF00/000000?text=Event+3',
  'https://via.placeholder.com/150/00FF00/0000FF?text=Event+4',
  'https://via.placeholder.com/150/FF00FF/FFFF00?text=Event+5',
  'https://via.placeholder.com/150/00FFFF/FF00FF?text=Event+6',
  'https://via.placeholder.com/150/0000FF/808080?text=Event+7',
  'https://via.placeholder.com/150/FF0000/FFFFFF?text=Event+8',
  'https://via.placeholder.com/150/FFFF00/000000?text=Event+9',
  'https://via.placeholder.com/150/00FF00/0000FF?text=Event+10',
  'https://via.placeholder.com/150/FF00FF/FFFF00?text=Event+11',
  'https://via.placeholder.com/150/00FFFF/FF00FF?text=Event+12',
  'https://via.placeholder.com/150/0000FF/808080?text=Event+13',
  'https://via.placeholder.com/150/FF0000/FFFFFF?text=Event+14',
  'https://via.placeholder.com/150/FFFF00/000000?text=Event+15',
  'https://via.placeholder.com/150/00FF00/0000FF?text=Event+16',
  'https://via.placeholder.com/150/FF00FF/FFFF00?text=Event+17',
  'https://via.placeholder.com/150/00FFFF/FF00FF?text=Event+18',
  'https://via.placeholder.com/150/0000FF/808080?text=Event+19',
  'https://via.placeholder.com/150/FF0000/FFFFFF?text=Event+20'
];


const eventTitles = [
  'Music Fest',
  'Sports Gala',
  'Education Expo',
  'Food Festival',
  'Tech Conference',
  'Art Exhibition',
  'Business Summit',
  'Health Workshop',
  'Travel Meetup',
  'Startup Pitch',
  'Film Screening',
  'Cultural Fest',
  'Literature Meet',
  'Photography Walk',
  'Yoga Retreat',
  'Dance Marathon',
  'Science Fair',
  'Environmental Talk',
  'Fashion Show',
  'Cooking Class'
];

const eventDescriptions = [
  'Join us for a fantastic music fest featuring top artists.',
  'Come and enjoy various sports activities and competitions.',
  'Explore educational opportunities and meet institutions.',
  'Taste a variety of cuisines from different cultures.',
  'Learn about the latest in technology and innovation.',
  'Admire and purchase artwork from talented artists.',
  'Network with business professionals and entrepreneurs.',
  'Attend workshops on health and wellness.',
  'Share travel experiences and tips with fellow enthusiasts.',
  'Pitch your startup idea to investors and mentors.',
  'Watch a screening of an acclaimed film.',
  'Experience a celebration of diverse cultures.',
  'Discuss and share your favorite literature.',
  'Join a walk to capture stunning photographs.',
  'Participate in a rejuvenating yoga retreat.',
  'Dance to your heart\'s content in our marathon.',
  'Discover exciting science projects and experiments.',
  'Learn about environmental issues and solutions.',
  'Enjoy a spectacular fashion show.',
  'Enhance your cooking skills with a professional chef.'
];

const startDate = new Date();
const endDate = new Date();
endDate.setHours(startDate.getHours() + 2);


const generateEvents = async () => {
  try {
    await connectToDatabase();

    
    const categories = await Category.find({});
    const staffUsers = await User.find({ isStaff: true });

    if (categories.length === 0 || staffUsers.length === 0) {
      throw new Error('No categories or staff users found in the database.');
    }

    const events = Array.from({ length: 20 }, (_, index) => ({
      title: eventTitles[index],
      description: eventDescriptions[index],
      location: `Location ${index + 1}`,
      startDateTime: new Date(startDate.setDate(startDate.getDate() + index)),
      endDateTime: new Date(endDate.setDate(endDate.getDate() + index)),
      imageUrl: sampleImageUrls[index % sampleImageUrls.length],
      price: `${Math.floor(Math.random() * 100)}`,
      capacity: `${Math.floor(Math.random() * 500)}`,
      isFree: Math.random() > 0.5,
      url: `https://example.com/event-${index + 1}`,
      category: categories[index % categories.length]._id,
      organizer: staffUsers[index % staffUsers.length]._id,
    }));

    await Event.insertMany(events);
    console.log('Database seeded with 20 events.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

generateEvents();
