<h1>The Hood Hub</h1>
Link to the hosted version
https://hud-events.vercel.app/

The Hood Hub is a community events application where staff members can post events and users can create an account to attend events. Users can also add events to their Google Calendar if they wish.

<h2>Features</h2>
Staff Management: Staff members can create, update, and delete events.
User Interaction: Users can browse events, attend events, and add them to their Google Calendar.
Event Sorting: Events can be sorted by category for easier browsing.
Profile Management: Users can view their profile, including upcoming and past events.
Installation
Follow these steps to clone and set up the project locally.

<h2>Prerequisites</h2>
Make sure you have the following installed on your machine:

Node.js (version 14 or higher)
npm (version 6 or higher)
MongoDB
Clone the Repository
Open your terminal.
Clone the repository using the following command:
bash
Copy code
git clone https://github.com/your-username/hud-events.git
Navigate to the project directory:
bash
Copy code
cd hud-events
Install Dependencies
Install the required dependencies using npm:

Copy code
npm install

Set Up the Environment Variables
Create a .env file in the root of the project.
Add the following environment variables:
plaintext
Copy code
MONGODB_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
Replace <Your MongoDB URI> with your actual MongoDB URI and <Your JWT Secret> with a secret key for JWT.
Running the Application
Start the development server:

Copy code
npm run dev
Open http://localhost:3000 with your browser to see the result.
Usage
Staff Actions
Create Event: Staff can create new events by providing details like title, description, date, time, and category.
Manage Events: Staff can update or delete existing events.
User Actions
Browse Events: Users can view all available events.
Attend Events: Users can mark events as attended.
Add to Google Calendar: Users can add events to their Google Calendar.
Profile Management: Users can view their profile to see upcoming and past events.
Sample Users
Use the following credentials to browse the application:

Staff:
Email: tom@email.com
Password: 11111111
User:
Email: john@email.com
Password: 11111111
Contributing
We welcome contributions! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.
License
This project is licensed under the MIT License. See the LICENSE file for more details.
