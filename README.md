
    <h1>The Hood Hub</h1>
    <p><a href="https://hud-events.vercel.app/">Link to the hosted version</a></p>

    <p>The Hood Hub is a community events application where staff members can post events and users can create an account to attend events. Users can also add events to their Google Calendar if they wish.</p>

    <h2>Features</h2>
    <ul>
        <li><strong>Staff Management</strong>: Staff members can create, update, and delete events.</li>
        <li><strong>User Interaction</strong>: Users can browse events, attend events, and add them to their Google Calendar.</li>
        <li><strong>Event Sorting</strong>: Events can be sorted by category for easier browsing.</li>
        <li><strong>Profile Management</strong>: Users can view their profile, including upcoming and past events.</li>
    </ul>

    <h2>Installation</h2>
    <p>Follow these steps to clone and set up the project locally.</p>

    <h3>Prerequisites</h3>
    <p>Make sure you have the following installed on your machine:</p>
    <ul>
        <li><strong>Node.js</strong> (version 14 or higher)</li>
        <li><strong>npm</strong> (version 6 or higher)</li>
        <li><strong>MongoDB</strong></li>
    </ul>

    <h3>Clone the Repository</h3>
    <ol>
        <li>Open your terminal.</li>
        <li>Clone the repository using the following command:</li>
        <pre><code>git clone https://github.com/your-username/hud-events.git</code></pre>
        <li>Navigate to the project directory:</li>
        <pre><code>cd hud-events</code></pre>
    </ol>

    <h3>Install Dependencies</h3>
    <p>Install the required dependencies using npm:</p>
    <pre><code>npm install</code></pre>

    <h3>Set Up the Environment Variables</h3>
    <ol>
        <li>Create a <code>.env</code> file in the root of the project.</li>
        <li>Add the following environment variables:</li>
        <pre><code>MONGODB_URI=&lt;Your MongoDB URI&gt;
JWT_SECRET=&lt;Your JWT Secret&gt;</code></pre>
        <p>Replace <code>&lt;Your MongoDB URI&gt;</code> with your actual MongoDB URI and <code>&lt;Your JWT Secret&gt;</code> with a secret key for JWT.</p>
    </ol>

    <h3>Running the Application</h3>
    <ol>
        <li>Start the development server:</li>
        <pre><code>npm run dev</code></pre>
        <li>Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the result.</li>
    </ol>

    <h2>Usage</h2>

    <h3>Staff Actions</h3>
    <ul>
        <li><strong>Create Event</strong>: Staff can create new events by providing details like title, description, date, time, and category.</li>
        <li><strong>Manage Events</strong>: Staff can update or delete existing events.</li>
    </ul>

    <h3>User Actions</h3>
    <ul>
        <li><strong>Browse Events</strong>: Users can view all available events.</li>
        <li><strong>Attend Events</strong>: Users can mark events as attended.</li>
        <li><strong>Add to Google Calendar</strong>: Users can add events to their Google Calendar.</li>
        <li><strong>Profile Management</strong>: Users can view their profile to see upcoming and past events.</li>
    </ul>

    <h3>Sample Users</h3>
    <p>Use the following credentials to browse the application:</p>
    <ul>
        <li><strong>Staff</strong>: 
            <ul>
                <li>Email: tom@email.com</li>
                <li>Password: 11111111</li>
            </ul>
        </li>
        <li><strong>User</strong>: 
            <ul>
                <li>Email: john@email.com</li>
                <li>Password: 11111111</li>
            </ul>
        </li>
    </ul>

    <h2>Contributing</h2>
    <p>We welcome contributions! Please follow these steps to contribute:</p>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch (<code>git checkout -b feature-branch</code>).</li>
        <li>Make your changes and commit them (<code>git commit -m 'Add some feature'</code>).</li>
        <li>Push to the branch (<code>git push origin feature-branch</code>).</li>
        <li>Create a new Pull Request.</li>
    </ol>

    <h2>License</h2>
    <p>This project is licensed under the MIT License. See the LICENSE file for more details.</p>

    <h2>Contact</h2>
    <p>If you have any questions or suggestions, please feel free to reach out to us at <a href="mailto:your-email@example.com">your-email@example.com</a>.</p>

