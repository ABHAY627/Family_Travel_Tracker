import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Abhay@151", // Replace with your actual password
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisited() {
  try {
    const result = await db.query(
      "SELECT country_code FROM visited_countries WHERE user_id = $1;",
      [currentUserId]
    );
    return result.rows.map((row) => row.country_code);
  } catch (err) {
    console.error("Error checking visited countries:", err);
    return [];
  }
}

async function getCurrentUser() {
  try {
    const result = await db.query("SELECT * FROM users;");
    users = result.rows;

    const user = users.find((u) => u.id == currentUserId);
    return user || null;
  } catch (err) {
    console.error("Error getting current user:", err);
    return null;
  }
}

app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return res.status(404).send("Current user not found in the database.");
    }

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
    });
  } catch (err) {
    console.error("Error loading home page:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return res.status(400).send("Invalid user.");
  }

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Country not found.");
    }

    const countryCode = result.rows[0].country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2);",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (insertErr) {
      console.error("Error inserting visited country:", insertErr);
      res.status(500).send("Failed to add country.");
    }
  } catch (queryErr) {
    console.error("Error querying country:", queryErr);
    res.status(500).send("Error finding country.");
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    const selectedId = parseInt(req.body.user);
    if (!isNaN(selectedId)) {
      currentUserId = selectedId;
    }
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;",
      [name, color]
    );
    currentUserId = result.rows[0].id;
    res.redirect("/");
  } catch (err) {
    console.error("Error creating new user:", err);
    res.status(500).send("Failed to create new user.");
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
