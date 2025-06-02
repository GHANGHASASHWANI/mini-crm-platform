#  Mini CRM Platform – Xeno SDE Internship Assignment 2025

Hi there! 
This is my submission for the **SDE Internship at Xeno**. The project demonstrates my ability to build a real-world, scalable CRM solution with customer segmentation, campaign management, and AI-powered insights.

---

##  Features Implemented

### ✅ 1. Data Ingestion APIs
- RESTful APIs for **customer** and **order** data ingestion
- Input validation using middleware
- API documentation available via **Swagger UI**
- ✅ *Bonus:* Implemented **Redis Streams** (pub-sub)
  - API performs validation only
  - A **Redis consumer** handles DB persistence asynchronously

### ✅ 2. Campaign Creation UI
- Segment builder with **AND/OR** logic for audience targeting  
  _e.g., (spend > ₹10,000 AND visits < 3) OR (inactive > 90 days)_
- Real-time **audience size preview**
- After saving, redirects to a **Campaign History Page** with:
  - List of past campaigns
  - Stats: `Sent`, `Failed`, `Audience size`
  - Most recent campaign at the top
- ✅ *Bonus UX:* Clean UI with Bootstrap components and conditional rule builder

### ✅ 3. Campaign Delivery & Logging
- Campaign details logged in `communication_log` collection
- Sends personalized messages (e.g., “Hi Ashu, get 10% off!”)
- Vendor API simulates delivery:
  - ~90% success rate
  - ~10% failure
- Delivery Receipt API updates status
- ✅ *Bonus:* Delivery updates handled via Redis-based batching mechanism

### ✅ 4. Authentication
- **Google OAuth 2.0** using Passport.js
- Only authenticated users can:
  - Create audience segments
  - View or send campaigns

### ✅ 5. AI Integration – Campaign Performance Summarization
- Uses **Gemini-2.0-flash** to summarize campaign stats
- Example Output:
  _“Your campaign reached 1,284 users. 1,140 messages were delivered. High-spend users saw a 95% success rate.”_
- Prompt and integration securely handled using `.env`

---

---

### 📦 Architecture:

```plaintext
 ──────────────────────────────┐
│ MINI_CRM_PLATFORM            │
└──────────────────────────────┘
        │
        └── mini-crm
             ├── ┌──────────────┐       ┌──────────────┐
             │   │   backend    │───────│   frontend   │
             │   └──────────────┘       └──────────────┘
             │          │                  │
             │          ├── config         │── public
             │          ├── controllers    │── services
             │          ├── middleware     │     └── api
             │          ├── models         │── src
             │          ├── publishers     │     ├── components
             │          ├── routes         │     ├── contexts
             │          ├── subscribers    │     ├── layouts
             │          ├── uploads        │     ├── pages
             │          ├── validators     │     ├── routes
             │          ├── .env           │     ├── widgets
             │          ├── .gitignore     │     ├── App.jsx
             │          ├── package.json   │     ├── firebase.js
             │          ├── package-lock.json│   ├── index.css
             │          ├── server.js      │     ├── main.jsx
             │          └── node_modules   │     ├── .env
             │                             │     ├── .gitignore
             │                             │     ├── index.html
             │                             │     ├── package.json
             │                             │     ├── package-lock.json
             │                             │     ├── vite.config.js
             │                             │     └── node_modules
             └── ... (other root level files)
```

## 📦 Local Setup Instructions

### 1 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill Mongo URI, Redis URL, Google OAuth credentials, Gemini key
npm run dev
```
### 2 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
---
## 🔐 Authentication
Google Sign-In via OAuth 2.0

Protected routes for campaign features

Tokens are managed via session cookies

## 🧠 AI Integration Details
Feature	Tool/API Used	Description

Campaign Summary Generator	Gemini-2.0-flash	Summarizes delivery stats into human-readable form

Prompt Engineering	Custom Prompt	Tailored prompts for better insights

## 🛠 Tech Stack Used
Layer	Technology

Frontend	React.js (Vite + Bootstrap)

Backend	Node.js (Express.js)

Auth	Passport + Google OAuth 2.0

Database	MongoDB (Mongoose)

Messaging	Redis Streams

Gemini-2.0-flash

## 🧪 Testing & Demo

✅ Demo Video: [Link](https://mini-crm-platform-3svv.vercel.app/dashboard)

✅ Access Link: [Link](https://mini-crm-platform-3svv.vercel.app/dashboard)

## 🙋 About Me

👨‍💻 **Ashwani Ghanghas **  
Engineering student | 5⭐ HackerRank (C++)  
Passionate about building real-world scalable apps  
[LinkedIn](https://www.linkedin.com/in/ashwanighanghas) | [GitHub](https://github.com/GHANGHASASHWANI)



