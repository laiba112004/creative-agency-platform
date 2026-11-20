
# CreativeStudio 
### Full-Stack Video Production & Creative Agency Platform

A modern web application built for digital creative agencies, video editors, and high-growth content creators.  
Handles the entire project lifecycle — from instant quote estimation and multi-rail checkout to frame-accurate video reviews, 50GB footage transfers, and agency pipeline management.

---

**Built with the MERN Stack**  
React 19 &bull; Vite &bull; Node.js &bull; Express &bull; MongoDB &bull; Tailwind CSS

</div>

---

## 📌 Project Overview

When creative agencies work with creators and brands, communication usually gets scattered across WhatsApp messages, Google Drive links, endless revision emails, and manual bank transfers. 

**CreativeStudio** was built to bring all of that into one unified, clean workspace:

- **For Creators / Clients**: Choose a package or build a custom quote, attach raw footage via a resumable uploader, leave second-by-second revision notes directly on the video player, and download official PDF invoices.
- **For Agency Owners / Editors**: Track orders through a live 5-stage milestone pipeline, monitor gross revenue and turnaround SLAs, manage incoming leads, and balance team editing workloads.

---

## ⚡ Key Highlights & Features

### 🎥 Client Experience & Conversion
- **Interactive 4K Showreel Lightbox**: Embedded showcase modal with lazy-loaded video streaming and real performance metrics (500M+ views, 99.4% on-time delivery).
- **Before & After Visual Comparison**: Touch-draggable comparison slider showing raw camera log footage vs. final color-graded output and high-CTR thumbnail designs.
- **Instant Quote Calculator**: Real-time price estimator based on video length and quantity, featuring automatic monthly retainer discounts (up to 20% off) and an instant **USD ($) / PKR (₨)** currency switcher.
- **3-Step Checkout Drawer**: Modular package selection (Starter, Pro, Elite) with customizable add-ons (rush delivery, shorts cut-downs, A/B thumbnails), promo code engine (`LAUNCH20`), and multiple payment methods (Credit/Debit Card, Meezan Bank IBAN, Raast, JazzCash).
- **1:1 Strategy Call Booking**: Interactive booking calendar with weekday selection, PKT time slots, and automatic Google Meet link generation.
- **Creator Case Studies & Insights**: Real-world breakdowns of high-retention video edits and thumbnail tear-downs, paired with a newsletter subscription magnet.

### 🛠️ Client Portal & Workspace
- **Client Authentication**: Google Workspace SSO and email sign-in with tenant isolation (clients only see their own active projects).
- **5-Stage Milestone Tracker**: Live visual status progression (`Received` ➔ `Assets Verified` ➔ `In Editing` ➔ `Ready for Review` ➔ `Approved & Delivered`).
- **Frame-Accurate Video Review Studio**: In-browser video review player with timeline scrubbing and timecoded comments (e.g., `00:24 - Make sound effect punchier`) for clear editor-client collaboration.
- **50GB Media Vault**: Native OS file picker integration simulating chunked resumable uploads (~42.8 MB/s transfer speed) with a verified file repository and direct download actions.
- **Instant PDF Invoice Generator**: One-click branded tax invoice generator (`#INV-2026-XXXX`) built with `jsPDF`. Automatically downloads a clean A4 PDF receipt to the client's laptop, complete with itemized billing, 0% export tax, and an official **Commercial Copyright Transfer Clause**.

### 📊 Agency Management & AI
- **Agency CRM & Analytics**: Real-time gross pipeline revenue counter, deal pipeline status transitions, SLA tracker, and senior editor workload capacity bars.
- **AI Creative Producer**: Floating chatbot trained on agency turnaround times, packages, and pricing to assist prospective clients 24/7.
- **Mobile-First Experience**: Fully responsive with a persistent sticky bottom action bar (Services, Portal, WhatsApp, Order) and tap-friendly targets.
- **Accessible Toast Notifications**: Custom animated dark/gold toast system replacing intrusive native browser alerts.

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v3 (custom dark navy `#0B1220` & royal gold `#C9A24B` palette)
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **HTTP Client**: Axios
- **Fonts**: Sora (Headings) & Plus Jakarta Sans (Body)

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: MVC REST API pattern
- **Security & Config**: Dotenv, CORS, express.json

---

## 📂 Project Directory Structure

```text
creative-agency-platform/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets & favicons
│   ├── src/
│   │   ├── components/         # Modular UI components
│   │   │   ├── Navbar.jsx          # Header with navigation & auth badge
│   │   │   ├── Hero.jsx            # Headline & 4K showreel lightbox
│   │   │   ├── ServicesSection.jsx # Agency services grid
│   │   │   ├── ThumbnailSlider.jsx # Touch-enabled before/after comparison
│   │   │   ├── PortfolioSection.jsx# Filterable portfolio & preview modal
│   │   │   ├── ProcessSection.jsx  # 4-step agency workflow
│   │   │   ├── QuoteCalculator.jsx # Dynamic price & turnaround estimator
│   │   │   ├── PricingSection.jsx  # Tiered packages & 3-step checkout
│   │   │   ├── OrdersDashboard.jsx # Client portal, review player & vault
│   │   │   ├── InvoiceModal.jsx    # Tax invoice modal & PDF export
│   │   │   ├── BookingModal.jsx    # 1:1 Strategy call scheduler
│   │   │   ├── BlogSection.jsx     # Case studies & weekly newsletter
│   │   │   ├── AiAssistant.jsx     # AI Producer chatbot
│   │   │   ├── MobileStickyBar.jsx # Sticky mobile bottom navigation
│   │   │   └── ...
│   │   ├── context/            # Global Auth & Toast state providers
│   │   ├── utils/              # Client-side PDF generation utility
│   │   ├── App.jsx             # Main application layout & coordinators
│   │   └── index.css           # Tailwind custom styles & glass tokens
│   └── package.json
│
├── server/                     # Backend REST API
│   ├── config/db.js            # MongoDB connection handler
│   ├── controllers/            # Request handlers (orders, status, notes)
│   ├── models/                 # Mongoose schemas (Order, User)
│   ├── routes/                 # Express API route endpoints
│   ├── server.js               # Application entry point
│   ├── .env.example            # Sample environment configuration
│   └── package.json
│
├── .gitignore                  # Git ignore rules (protects .env & node_modules)
└── README.md                   # Project documentation
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)
- **MongoDB** (running locally or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/creative-agency-platform.git
cd creative-agency-platform
```

---

### Step 2: Configure & Start Backend
Open a terminal in the root directory:

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder (or copy from `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/creative-agency
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
npm run dev
```
> The API will be running at `http://localhost:5000`.

---

### Step 3: Configure & Start Frontend
Open a second terminal window:

```bash
cd client
npm install
npm run dev
```
> The web application will launch at `http://localhost:5173`.

---

## 📡 Core API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | Retrieve orders for the client pipeline |
| `POST` | `/api/orders` | Create a new order with package brief & add-ons |
| `GET` | `/api/orders/:id` | Fetch details for a specific order |
| `PATCH` | `/api/orders/:id/status` | Advance or update the production stage milestone |
| `POST` | `/api/orders/:id/comments` | Add a frame-accurate timecode revision note |
| `GET` | `/` | API server health check |

---

## 💡 Key Engineering Decisions

1. **Custom Toast Architecture Over Native Alerts**: Native browser `alert()` dialogs pause JavaScript execution and feel clunky. We built a React Context toast notification system with dark glass styling and gold accents to handle asynchronous success, error, and info states smoothly.
2. **Resumable Large File Upload Strategy**: Uploading 10GB–50GB 4K video files directly through a standard Node.js server causes bottlenecks. The platform features a client-side chunked simulation hook designed to integrate directly with S3/R2 presigned multipart upload architectures.
3. **Client-Side Vector PDF Rendering**: Instead of rendering invoices on the backend and streaming large files, `jsPDF` calculates exact vector typography and line items directly in the browser, triggering an instant native download.
4. **Domestic & International Dual-Currency Rails**: Recognizing that agency clients operate both globally (USD) and locally in Pakistan (PKR), the checkout system and quote calculator support dual currency toggles with Pakistan domestic payment details (Meezan Bank, Raast, JazzCash).

---


