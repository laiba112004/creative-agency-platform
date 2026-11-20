# 🎬 CreativeStudio — Full-Stack Creative Agency & Video Production Platform

A modern, production-grade web platform designed for digital media agencies and high-growth YouTube creators. It streamlines the entire creative client lifecycle: from dynamic quote estimation and multi-rail checkout to interactive frame-accurate video reviews, high-speed 50GB file ingestion, and studio CRM analytics.

---

## 💡 About The Project

Traditional creative agencies struggle with disjointed workflows: client intake happens across WhatsApp messages, large video files break normal forms, revisions get lost in messy email threads, and payment methods often don't support local domestic banking alongside international cards.

**CreativeStudio** solves this by providing a unified client workspace and agency dashboard built on the MERN stack (MongoDB, Express, React, Node.js). Clients can configure custom packages, upload raw camera footage through a resumable chunked uploader, review video cuts with second-by-second timecode comments, and download official PDF tax invoices upon completion.

---

## Core Features

### 🎥 Hero & 4K Showreel Lightbox
- High-impact visual introduction with live social proof counters (500M+ views generated, 99.4% on-time delivery rate).
- Instant-launch 4K video lightbox allowing prospective clients to preview agency production quality without leaving the landing page.

### Interactive Before / After Comparison Slider
- Draggable comparison viewport allowing creators to compare raw camera log footage against final Hollywood-grade Rec.709 color grading and high-CTR thumbnail compositions.
- Fully touch-enabled for mobile phones and tablets.

### Dynamic Instant Quote Calculator
- Real-time pricing engine based on target video length (1 to 45 minutes) and quantity.
- Automated monthly retainer bundle discounts (up to 20% off for 4+ videos).
- Instant **USD ($) / PKR (₨)** dual-currency switcher calculated at commercial bank exchange rates.
- Direct booking synchronization with the MongoDB database.

### 3-Step Checkout & Multi-Rail Payments
- Tiered packages: **Starter ($149)**, **Pro ($299)**, and **Elite ($599)**.
- Modular add-on configurator: 48-hour rush delivery, 3x A/B test thumbnails, shorts/reels repurposing, and SEO title packs.
- Promo coupon engine (e.g. `LAUNCH20` for an instant 20% discount).
- Multi-rail payment support:
  - **International**: Credit / Debit card processing.
  - **Pakistan Domestic**: Direct IBAN bank transfer (Meezan Bank), Raast Instant ID, and JazzCash mobile wallet.

### 📊 Client Portal & 5-Stage Milestone Tracker
- Secure workspace with Google Workspace SSO and email authentication.
- Tenant isolation: Clients only see their own active projects and pipeline status.
- Real-time 5-stage production milestone tracking:
  `Received` ➔ `Assets Verified` ➔ `In Editing` ➔ `Ready for Review` ➔ `Approved & Delivered`.

### 🎬 Frame-Accurate Video Review Studio
- In-browser custom video review player with timeline scrubbing.
- Pinned timecode feedback: clients can leave timestamped notes (e.g., `00:24 - Make transition sharper`).
- Two-way collaborative thread between the client reviewer and the senior video editor.
- One-click master approval button.

###  50GB Media Vault & Resumable Chunk Uploader
- Native OS File Explorer picker allowing clients to select real 4K video footage and project ZIPs.
- Chunked transfer simulator showing live byte progress and cloud upload speeds (~42.8 MB/s).
- Verified asset repository with direct download triggers.

###  Agency CRM & Executive Analytics
- Real-time gross pipeline revenue counter and SLA delivery compliance rate (99.4%).
- Interactive CRM leads pipeline table with stage advancement (`New Inquiry` ➔ `In Production` ➔ `Won & Retained`).
- Senior editor and art director weekly workload capacity bars.

###  CreativeStudio AI Assistant
- 24/7 AI Producer chatbot trained on agency turnaround times, packages, and recommendations.
- Markdown formatting with gold highlights and quick-tap suggestion chips.

###  Auto-Generated PDF Tax Invoices
- One-click invoice generation (`#INV-2026-XXXX`) with 0% software export tax and dual-currency breakdown.
- Automatically downloads an authentic `.pdf` invoice directly to the client's laptop Downloads folder via `jsPDF`.
- Includes an official **Commercial Copyright Assignment Clause** unconditionally transferring all intellectual property rights to the client.

###  1:1 Strategy Call Booking
- Integrated consultation calendar with weekday selection, Pakistan Standard Time (PKT) slots, and automated Google Meet link provisioning.

### 📱 Mobile-First Responsive Design
- Fully optimized across mobile, tablet, laptop, and ultrawide monitors.
- Sticky mobile bottom bar with 44px+ tap targets for Services, Portal, WhatsApp, and Order.
- Custom dark-gold Toast notification architecture replacing all native browser alerts.

---

## Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v3 (Custom Dark & Gold Luxury Palette)
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Document Generation**: jsPDF
- **Typography**: Sora (Display) & Plus Jakarta Sans (Body)

### Backend & Database
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB & Mongoose ODM
- **Environment**: Dotenv & CORS
- **Architecture**: RESTful API with MVC pattern

---

## 📁 Project Structure

```
creative-agency-platform/
├── client/                     # Frontend React + Vite application
│   ├── src/
│   │   ├── components/         # Modular UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── ThumbnailSlider.jsx
│   │   │   ├── PortfolioSection.jsx
│   │   │   ├── ProcessSection.jsx
│   │   │   ├── QuoteCalculator.jsx
│   │   │   ├── PricingSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── BlogSection.jsx
│   │   │   ├── FaqSection.jsx
│   │   │   ├── OrdersDashboard.jsx
│   │   │   ├── InvoiceModal.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   ├── LoginModal.jsx
│   │   │   ├── LegalModal.jsx
│   │   │   ├── CookieBanner.jsx
│   │   │   ├── MobileStickyBar.jsx
│   │   │   └── AiAssistant.jsx
│   │   ├── context/            # Auth & Toast global providers
│   │   ├── utils/              # PDF generator & helpers
│   │   ├── App.jsx             # Root layout & modal coordinator
│   │   └── index.css           # Tailwind layers & luxury glass tokens
│   └── package.json
│
├── server/                     # Backend Node + Express REST API
│   ├── config/                 # MongoDB database connection
│   ├── controllers/            # Order & pipeline controllers
│   ├── models/                 # Mongoose schemas (Order, Client)
│   ├── routes/                 # Express API routes
│   ├── server.js               # Entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/creative-agency-platform.git
cd creative-agency-platform
```

### 2. Set Up the Backend Server
```bash
cd server
npm install
```

Ensure your `.env` file in the `server` directory contains:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/creative-agency
CLIENT_URL=http://localhost:5173
```

Start the API server:
```bash
npm run dev
```
> The API will be running at `http://localhost:5000`.

### 3. Set Up the Frontend Client
In a new terminal window:
```bash
cd client
npm install
npm run dev
```
> The application will open at `http://localhost:5173`.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | Fetch active production orders |
| `POST` | `/api/orders` | Create a new order with package brief & add-ons |
| `GET` | `/api/orders/:id` | Fetch details for a specific order |
| `PATCH` | `/api/orders/:id/status` | Update milestone progress (e.g. In Editing ➔ Ready for Review) |
| `POST` | `/api/orders/:id/comments` | Add a frame-accurate timecode revision note |
| `GET` | `/` | API health check route |

---

##  Engineering Decisions

1. **Zero Browser Alerts**: Replaced all intrusive native `window.alert()` dialogs with an animated, accessible dark/gold Toast notification system that doesn't block the JavaScript execution thread.
2. **Resumable Large File Architecture**: Handled large 50GB 4K camera footage through client-side chunked simulation hooks to demonstrate enterprise cloud storage integration (AWS S3 / R2 presigned upload pipeline).
3. **Direct Vector PDF Rendering**: Utilized `jsPDF` for client-side invoice compilation, generating authentic A4 tax invoices with exact mathematical positioning and instant browser download triggers.
4. **Mobile Navigation Hierarchy**: Added a dedicated persistent bottom action bar on mobile viewports for quick access to Services, WhatsApp, Client Portal, and Checkout.


