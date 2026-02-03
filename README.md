**Events Website**

A full-stack web application that scrapes live event data from Eventbrite and displays upcoming events in Sydney in a clean and user-friendly interface.

This project was built as a learning assignment to understand web scraping, backend APIs, and frontend rendering using JavaScript.

---

Features

- Scrapes live event data from Eventbrite
- Stores events in a local JSON file
- REST API to fetch events
- Displays events in card format
- "Get Tickets" button redirects to the official event page
- Simple and responsive UI

---

Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**Scraping**
- Axios
- Cheerio

---

**📂 Project Structure**
event-site/
│── public/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
│── events.json
│── scraper.js
│── server.js
│── package.json


---

 **1️⃣ Clone the repository**
```bash
git clone https://github.com/Nihal-0786/events-website.git
cd events-website

npm install

node scraper.js

node server.js

http://localhost:3000


This is the **correct and clean format**.

---

STEP 2: Why this is correct (so you understand)

- `git clone` → downloads project  
- `npm install` → installs required packages  
- `node scraper.js` → fills `events.json`  
- `node server.js` → starts backend  
- `localhost:3000` → opens website  

This shows **you understand the flow**.

---

STEP 3: After this, what should YOU do?

### ✔ If you are editing README on GitHub:
1. Scroll down  
2. Commit message:
3. Click **Commit changes**

---

### ✔ If editing in VS Code:
Run:
```bash
git add README.md
git commit -m "Improve README setup steps"
git push
 



