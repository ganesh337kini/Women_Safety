<!-- PROJECT HEADER -->
<div align="center">

# 💖 Women Safety Zowe  

### _Enhancing Women’s Safety through Technology, Awareness, and Real-Time Action._

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwomen-safety-zowe.vercel.app&style=flat-square&color=brightgreen)](https://women-safety-zowe.vercel.app)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

<p align="center">
  <b>A web application aimed at enhancing women’s safety by providing SOS alerts, safe zones, guardian contacts, and real-time location sharing.</b>
</p>

🔗 **Live Website:** [https://women-safety-zowe.vercel.app](https://women-safety-zowe.vercel.app)

</div>

---

## 🌸 About the Project

**Women Safety Zowe** is a modern and intuitive web platform designed to ensure women’s safety by combining real-time location tracking, alert systems, and safety awareness.  
Users can define safe zones, manage trusted guardians, send emergency SOS alerts, and receive live safety updates.

💡 _Our mission: Empower women through smart, secure, and compassionate technology._

---

## 🌟 Features

| Feature | Description |
|----------|--------------|
| 🏠 **Welcome / Home Page** | Introduction and navigation to all key safety modules. |
| 🛡️ **Safe Zone** | Allows users to define safe geographical areas. |
| 👨‍👩‍👧 **Guardians** | Add and manage trusted emergency contacts. |
| 🚨 **Safety Alarm / SOS** | Sends an SOS alert with your live GPS location. |
| 📰 **Latest News / Safety Tips** | Displays real-time safety updates and advice. |

---

## 🧠 Tech Stack (with Explanation)

<div align="center">

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwindcss&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Backend-Node.js-68A063?logo=node.js&style=for-the-badge)
![Express](https://img.shields.io/badge/API-Express-000000?logo=express&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb&style=for-the-badge)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens&style=for-the-badge)
![Leaflet](https://img.shields.io/badge/Map-Leaflet-199900?logo=leaflet&style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Animation-Framer--Motion-0055FF?logo=framer&style=for-the-badge)
![GitHub](https://img.shields.io/badge/Version--Control-GitHub-181717?logo=github&style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?logo=vercel&style=for-the-badge)

</div>

| Layer | Technologies | Usage Explanation |
|-------|---------------|-------------------|
| **Frontend** | **React.js** | Builds the dynamic, responsive single-page interface for users to interact with the app. |
| **UI / Styling** | **Tailwind CSS** | Provides clean, modern design with responsive utility classes. |
| **Backend** | **Node.js + Express.js** | Handles APIs, user authentication, and SOS alert routing. |
| **Database** | **MongoDB** | Stores user data, guardian contacts, safe zones, and alert history. |
| **Authentication** | **JWT (JSON Web Tokens)** | Secures user sessions and verifies authentication tokens. |
| **Mapping** | **Leaflet + OpenStreetMap** | Displays real-time user location and safe zone boundaries. |
| **Animations** | **Framer Motion** | Adds smooth transitions and engaging UI animations. |
| **Version Control** | **Git + GitHub** | Manages source code and enables collaborative development. |
| **Deployment** | **Vercel** | Hosts the frontend and backend for fast, global accessibility. |

---

## 🏗️ System Architecture

Below is a high-level overview of how the **Women Safety Zowe** platform is structured:

```
                              +-----------------+
                              |   Map API /     |
                              |  Geolocation    |
                              +--------+--------+
                                       ^
                                       |
                                       |
+----------------------+     HTTPS     |   +--------------------+
|      Client (UI)     |-------------> |   |    External APIs    |
|  (React / Next.js)   |               |   |  (Map, SMS, Email)  |
| - SOS button         |               |   +--------------------+
| - Safe Zone editor   |
| - Guardians list     |
+----+---+-------------+
     |   |
     |   | WebSocket / HTTP
     v   v
+----------------------+
|   Server (Node/Express)|
| - Auth (JWT)         |
| - SOS routing        |
| - Notifications      |
| - Safe zones logic   |
+---+------------------+
    |
    |  CRUD
    v
+----------------------+
|     Database         |
|     (MongoDB)        |
| - Users & Guardians  |
| - Safe Zones         |
| - Alerts / History   |
+----------------------+
```




---

## ⚙️ Getting Started

```bash
# 1️⃣ Clone the repository
git clone https://github.com/ganesh337kini/Women_Safety.git
cd Women_Safety

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
# (MAP_API_KEY, DATABASE_URL, JWT_SECRET, EMAIL_SERVICE, etc.)

# 4️⃣ Run in development mode
npm run dev

# 5️⃣ Open in your browser
http://localhost:3000
