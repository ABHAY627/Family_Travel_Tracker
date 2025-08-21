# Travel Tracker Project

Welcome to the **Travel Tracker Project**! This is a learning project focused on implementing and interacting with PostgreSQL databases. The project is designed to help users track their travel experiences, including destinations, activities, memories, and more, while also serving as a practical exercise to understand web application development using modern technologies.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About the Project

This project was created as a hands-on learning exercise to explore the integration of PostgreSQL databases with a web application. The Travel Tracker Project allows users to:

- Add, edit, and delete travel destinations.
- Record activities and memories associated with each trip.
- View and manage a list of all travels.

The main objective is to understand database operations, data modeling, and the flow between a database, server, and front-end using modern web development tools.

## Features

- **User-Friendly Interface:** Responsive and intuitive UI built with EJS templates and styled with CSS.
- **CRUD Operations:** Create, Read, Update, and Delete travel records.
- **Memory Logging:** Attach notes, photos, or activities to each trip.
- **PostgreSQL Integration:** Efficient database schema for scalable data storage.
- **Learning Focus:** Well-structured code for educational purposes.

## Tech Stack

- **Frontend:** EJS (Embedded JavaScript Templating), CSS
- **Backend:** JavaScript (Node.js / Express)
- **Database:** PostgreSQL

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [PostgreSQL](https://www.postgresql.org/) installed and running

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ABHAY627/Travel_Tracker_Project.git
   cd Travel_Tracker_Project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - Create a PostgreSQL database (e.g., `travel_tracker`).
   - Update your database credentials in the configuration (usually in a `.env` file).

4. **Run database migrations:**  
   *(If provided, otherwise create necessary tables manually using schema below)*

5. **Start the application:**
   ```bash
   npm start
   ```

6. **Open your browser and visit:**  
   `http://localhost:3000`

## Database Schema

Here’s a sample schema to get you started:

```sql
CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  destination VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  notes TEXT
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
  activity VARCHAR(255),
  description TEXT
);
```

## Usage

- **Add a Trip:** Fill in the destination, dates, and notes.
- **View Trips:** See a list of all your travel records.
- **Manage Activities:** Attach activities or memories to each trip.
- **Edit/Delete:** Update or remove any trip or activity as needed.

## Screenshots

*Add screenshots of the UI here if available.*

## Contributing

Contributions are welcome! Please open issues or pull requests to discuss improvements, features, or bug fixes.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Created by [ABHAY627](https://github.com/ABHAY627)

---

Happy traveling and happy learning! 🌍✈️
