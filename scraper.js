const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const URL = "https://www.eventbrite.com/d/australia--sydney/events/";

async function scrapeEvents() {
  const response = await axios.get(URL, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(response.data);

  let oldEvents = [];
  if (fs.existsSync("events.json")) {
    oldEvents = JSON.parse(fs.readFileSync("events.json"));
  }

  const newEvents = [];

  $("a").each((i, el) => {
    const title = $(el).text().trim();
    const link = $(el).attr("href");

    if (
      title &&
      title.length > 20 &&
      !title.toLowerCase().includes("eventbrite") &&
      !title.includes("{") &&
      link &&
      link.startsWith("http")
    ) {
      newEvents.push({
        title,
        link,
        city: "Sydney",
        source: "Eventbrite",
        status: "new",
        scrapedAt: new Date()
      });
    }
  });

  // Mark inactive events
  oldEvents.forEach(oldEvent => {
    const stillExists = newEvents.find(e => e.link === oldEvent.link);
    if (!stillExists) {
      oldEvent.status = "inactive";
      newEvents.push(oldEvent);
    }
  });

  fs.writeFileSync("events.json", JSON.stringify(newEvents, null, 2));
  console.log("Events updated:", newEvents.length);
}


scrapeEvents();

