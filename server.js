const cron = require("node-cron");
const { exec } = require("child_process");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// Get events
app.get("/events", (req, res) => {
  const data = fs.readFileSync("events.json", "utf-8");
  res.json(JSON.parse(data));
});

// Save email registration
app.post("/register", (req, res) => {
  const { email, consent, eventTitle } = req.body;

  const entry = {
    email,
    consent,
    eventTitle,
    time: new Date()
  };

  let registrations = [];
  if (fs.existsSync("registrations.json")) {
    registrations = JSON.parse(fs.readFileSync("registrations.json"));
  }

  registrations.push(entry);
  fs.writeFileSync("registrations.json", JSON.stringify(registrations, null, 2));

  res.json({ success: true });
});

// Auto-run scraper every 6 hours
cron.schedule("0 */6 * * *", () => {
  console.log("Running scraper automatically...");
  exec("node scraper.js", (error, stdout, stderr) => {
    if (error) {
      console.error("Scraper error:", error);
      return;
    }
    console.log(stdout);
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

