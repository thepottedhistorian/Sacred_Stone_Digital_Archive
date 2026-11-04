# 📜 St. Martin's Proclamation (Martinmas) — Event Site Build

[![Status](https://img.shields.io/badge/Status-Active--Archived-success?style=flat-square)](https://github.com/thepottedhistorian/Sacred_Stone_Digital_Archive)
[![Type](https://img.shields.io/badge/Type-Event%20Website-1b3b22?style=flat-square)](https://github.com/)
[![Barony](https://img.shields.io/badge/SCA-Barony%20of%20the%20Sacred%20Stone-002B49?style=flat-square)](https://sacredstone.atlantia.sca.org/)
[![Canton](https://img.shields.io/badge/Canton-Salesberie%20Glen-122617?style=flat-square)](https://sacredstone.atlantia.sca.org/)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange?style=flat-square)](https://github.com/)
[![Code License](https://img.shields.io/badge/Code%20License-Apache%202.0-blue.svg?style=flat-square)](https://www.apache.org/licenses/LICENSE-2.0)
[![Content License](https://img.shields.io/badge/Content%20License-CC%20BY--NC%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Office](https://img.shields.io/badge/Office-Baronial%20Webministry-emerald.svg?style=flat-square)](https://sacredstone.atlantia.sca.org/)

**Baronial Webministry — Kingdom of Atlantia**  
**Webminister / Developer:** Ailís inghean Uí Riagáin (Rebecca Short)  
**Host Branch:** Canton of Salesberie Glen | Barony of the Sacred Stone  
**Parent Repository:** [Sacred Stone Digital Archive](https://github.com/thepottedhistorian/Sacred_Stone_Digital_Archive)  
**Live Site Target:** [sacredstone.atlantia.sca.org/martinmas/](https://sacredstone.atlantia.sca.org/martinmas/)  

---

## 📋 Overview
This directory contains the production web build for **St. Martin's Proclamation (Martinmas)**, hosted annually in the **Canton of Salesberie Glen** within the **Barony of the Sacred Stone** (Kingdom of Atlantia).

The website is engineered as a responsive, multi-page medieval manuscript scroll interface. Built without external heavyweight frameworks, it utilizes vanilla HTML5 and layered CSS3 to evoke period parchment aesthetic traditions—incorporating heraldic corner borders, woodcut motif accents (including the traditional St. Martin goose and lantern), structured timetable schedules, allergen matrices, and tournament documentation.

---

## 📂 Repository & File Structure

```text
website builds/Martinmas/
├── index.html            # Main landing page, royal progress, & event proclamation
├── activities.html       # Special tavern games, bardic circle, & evening festivities
├── arts.html             # Arts & Sciences competitions, displays, & rubrics
├── feast.html            # Multi-course feast menu, dietary notes, & allergy matrix
├── martial.html          # Heavy armored, Rapier, Archery, & Youth tournament rules
├── registration.html     # Site fees, payment deadlines, gate hours, & directions
├── schedule.html         # Day-of master chronological timetable
├── staff.html            # Event autocrat grid, marshals, & coordinator contacts
├── readme.md             # Project documentation & site manifest
└── assets/
    ├── css/
    │   ├── martinmas.css     # Base typography, grid styling, & color tokens
    │   └── martinmas_v2.css  # Enhanced scroll borders, parchment fills, & print rules
    └── images/
        ├── badge_salesberie.ico               # Canton favicon
        ├── badge_salesberie.png               # High-res Salesberie Glen heraldic badge
        ├── corner_border.png                  # Decorative scroll corner graphic assets
        ├── goose and lantern corner border.png# St. Martin heraldic corner flourishes
        └── parchment.jpg                      # Seamless archival parchment background
```

---

## ⚙️ Page Specifications & Functional Modules

### 1. Core Event Pages
- **Landing Gateway (`index.html`):** The primary proclamation entrance detailing site coordinates, royal attendance notices, general event themes, and accessibility accommodations.
- **Master Timetable (`schedule.html`):** Chronological event schedule spanning morning gate openings, royal courts, armor inspections, tournament lists, feast seatings, and evening bardic revels.
- **Registration & Gate (`registration.html`):** Explicit breakdowns of adult member discount fees, non-member surcharges, youth admission tiers, refund policies, and online pre-registration routing.
- **Staff & Coordination (`staff.html`):** Contact roster listing the Autocrat, Head Cook, Marshals of the Field, A&S Stewards, and Webminister, utilizing sanitized contact methods to prevent web scrapers.

### 2. Departmental Track Portals
- **Martial Combat (`martial.html`):** Specific tournament scenarios for Chivalric Heavy Combat, Rapier Prize Fights, Target Archery, and Thrown Weapons. Includes armor inspection deadlines, authorization prerequisites, and youth list rules.
- **Arts & Sciences (`arts.html`):** Guidelines for the St. Martin's Artisans Exhibition, competition categories, documentation expectations, and populace voting procedures.
- **Feast & Board (`feast.html`):** Full dinner menu and continuous sideboard schedule. Features a dedicated allergen transparency matrix (disclosing wheat, dairy, eggs, nuts, and nightshades) and feast steward contact channels for dietary inquiries.
- **Tavern & Evening Festivities (`activities.html`):** Period tavern games, brewing displays, illumination workshops, and musical bardic circles scheduled throughout the evening.

---

## 🎨 Design System & Visual Architecture

### Parchment & Heraldic Palette
The site styling combines period parchment warmth with the deep heraldic tones of the Barony and the Canton of Salesberie Glen:

| Token Name | Hex Value | Semantic Application |
| :--- | :--- | :--- |
| `--color-canton-green` | `#122617` | Canton headers, primary borders, and navigation anchors |
| `--color-heraldic-gold` | `#C5A880` | Accent dividers, callout frames, and heraldic embellishments |
| `--color-baronial-blue` | `#002B49` | Kingdom and Baronial administrative badge elements |
| `--color-parchment-base` | `#F4EBD9` | Light content reading area background |
| `--color-parchment-edge` | `#E2D2B8` | Aged border shading and shadow gradients |
| `--color-ink-black` | `#1C1814` | High-contrast body typography optimized for readability |

### Scroll Borders & Graphic Assets
- **Dual-Layered Stylesheets (`martinmas.css` & `martinmas_v2.css`):** Encapsulates fluid CSS grid and flexbox wrappers with responsive image border clipping (`corner_border.png` and `goose and lantern corner border.png`).
- **Texture Mapping:** Background layers tile `parchment.jpg` seamlessly using CSS background blending without increasing data transfer loads over cellular connections.

---

## 🛠️ Deployment & Maintenance Standards

### 1. Server Deployment (Kingdom Host)
1. Ensure all internal navigation links utilize relative pathing (e.g., `href="schedule.html"` rather than absolute domains) to allow staging across subdirectories.
2. Upload the `Martinmas/` directory via SFTP directly into the live production path:
   ```text
   /public_html/martinmas/
   ```
3. Verify permissions on the server are set to `755` for directories and `644` for files.

### 2. Field Accessibility & Caching
- **Zero Framework Footprint:** Operates strictly on vanilla HTML5, CSS3, and standard images, eliminating dependencies on external CDNs or JavaScript libraries.
- **Low-Bandwidth Mobile Caching:** The site structure is lightweight (< 1.5 MB total assets), ensuring that campers and tournament participants can load and cache schedules on mobile devices prior to arriving at rural event sites with spotty network coverage.
- **Dedicated Print Stylesheet (`@media print`):** Embedded print styles strip out heavy dark background textures, automatically converting schedules, feast courses, and directions into clean, ink-efficient white-and-black printed handouts directly from any mobile or desktop browser.

---

## ⚖️ License & Attribution

```text
Copyright (c) 2026 Rebecca Short (Ailís inghean Uí Riagáin) / Barony of the Sacred Stone
```

This repository contains both software source code and administrative creative assets. Assets are governed to encourage open sharing between SCA branches while safeguarding original design and heraldic attribution:

---

### 1. Code Assets (Apache License 2.0)
All frontend stylesheets (`.css`), layout markup files (`.html`), and client scripts are licensed under the **[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)**.

#### Required Attribution & Compliance Guidelines
If you fork, adapt, or utilize this event site build for another Barony, Canton, Shire, or Kingdom event:
- **Preserve File Headers:** You must retain the original copyright notice, author attribution, and disclaimer comments at the top of all CSS stylesheets and HTML files.
- **State Modifications:** Any files modified, altered, or refactored must carry prominent notices and timestamps stating that the files were changed and describing the alterations made.
- **Include License Text:** Any redistribution must include a copy of the Apache 2.0 license or a direct link to the full legal text (`https://www.apache.org/licenses/LICENSE-2.0`).
- **Standard Attribution Notice:** Include credit in your website footer or repository `README.md`:
  > *"Based on the Martinmas event build originally developed by Ailís inghean Uí Riagáin (Rebecca Short) for the Barony of the Sacred Stone Webministry (Kingdom of Atlantia)."*

---

### 2. Non-Code & Creative Assets (CC BY-NC 4.0)
All written event announcements, schedules, tournament scenarios, feast descriptions, graphic borders, and site layouts are licensed under the **[Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**.

- **Attribution:** When republishing, adapting, or excerpting written event materials or layout elements, you must credit **Rebecca Short (Ailís inghean Uí Riagáin)**, provide a link to the license, and state if changes were made.
- **Non-Commercial:** These materials may not be used, sold, or repurposed for commercial or fee-based endeavors outside of official Society activities.

---

### 3. Heraldic & Institutional Branding Notice
Heraldic artwork, registered armorial devices, badges, ensigns, official officer titles, and branch names associated with the **Barony of the Sacred Stone**, the **Canton of Salesberie Glen**, the **Kingdom of Atlantia**, or the **Society for Creative Anachronism, Inc.** remain the exclusive property of their respective owners. 

These elements are utilized within this repository strictly for official educational, historical, and baronial administrative operations, and are excluded from open-source software licensing grants.

---

## 🏰 SCA Disclaimer
This repository is maintained by volunteers of the **Barony of the Sacred Stone**, a branch of the **Society for Creative Anachronism, Inc. (SCA)**. 

This project is not an official publication of the Society for Creative Anachronism, Inc. and does not necessarily represent the views, official policies, or legal endorsements of the Society or its corporate officers.

---

> *"Technology in service to the Dream."*
