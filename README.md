# Harsh Shah - Tax Filing & GST Services

A premium, modern, responsive portfolio website built with **React** and **Vite** for Harsh Shah's tax filing and GST advisory practice. It features interactive tools, dynamic client workflows, a clean brand layout, and custom-styled utilities to convert leads smoothly.

## 🚀 Live Demo & Deployment
This project is configured out-of-the-box for instant deployment to **Vercel**:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## ✨ Key Features
- **Modern Hero Section**: Clean, high-impact background slide transition showcasing core services with clear Call-to-Actions (CTAs).
- **Service Showcase**: Clear directories listing Income Tax Returns (ITR), GST Registration/Returns, and MSME/Udyam setups.
- **Document Checklist Assistant**: Interactive profile configuration (Salaried, Self-Employed, Company, NGO) and filing selection (ITR, GST, MSME) generating custom reference document lists with double-digit index tags (No checkboxes or interactive options to ensure compliance clarity).
- **Print-to-PDF Friendly**: Custom `@media print` styling that formats the checklist into a clean, single-page professional letterhead (complete with custom header contact lines and footer notes, automatically hiding non-printable site areas).
- **Smart Lead Generators**:
  - **Compliance Quiz**: Onboarding quiz recommending services based on income brackets/types, generating formatted WhatsApp query payloads.
  - **Standardized Formats**: Dynamic WhatsApp query prompts that lead with the customer's **Name** first in a short, key-value professional structure.
- **Fully Responsive**: Optimized viewports and container paddings down to 320px mobile displays.

---

## 🛠️ Tech Stack
- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Icons**: React Icons (Font Awesome)
- **Styling**: Modern CSS3 (CSS Custom Variables, Glassmorphism, CSS Slide Animations)
- **Deployment**: Vercel

---

## 💻 Local Development

### 1. Clone & Install
```bash
# Navigate to the workspace directory
cd Harshwebsite

# Install node modules
npm install
```

### 2. Start Dev Server
```bash
# Launch hot-reload dev environment
npm run dev
```

### 3. Build & Validate
```bash
# Build the production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure
```text
Harshwebsite/
├── public/                # Static assets (Favicons, images)
├── src/
│   ├── assets/            # Styled theme assets
│   ├── components/        # UI components (Navbar, Hero, Quiz, Checklist, Contact, etc.)
│   ├── App.jsx            # Main app entry point
│   ├── main.jsx           # Vite index mounting
│   └── index.css          # Core CSS variables, typography, and utility rules
├── index.html             # HTML layout, metadata, and web title
├── vite.config.js         # Build system configuration
└── package.json           # Node configuration and script runners
```

---

## 🛡️ License
Designed and maintained by **Harsh Shah Tax & GST Services**. All rights reserved.
