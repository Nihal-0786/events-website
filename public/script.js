fetch("/events")
  .then(response => response.json())
  .then(events => {
    const container = document.getElementById("events");

    if (events.length === 0) {
      container.innerHTML = "<p>No events found.</p>";
      return;
    }

    events.forEach(event => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${event.title}</h3>
        <p><strong>Status:</strong> ${event.status}</p>
        <p><strong>Source:</strong> ${event.source}</p>
        <button onclick="getTickets('${event.title}', '${event.link}')">
          GET TICKETS
        </button>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("events").innerHTML =
      "<p>Error loading events</p>";
  });

function getTickets(title, link) {
  const email = prompt("Enter your email:");
  if (!email) return;

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      consent: true,
      eventTitle: title
    })
  }).then(() => {
    window.location.href = link;
  });
}

