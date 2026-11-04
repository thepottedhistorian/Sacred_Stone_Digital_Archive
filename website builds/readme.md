# 🌐 Sacred Stone Web Builds & Digital Portals

[![Branch](https://img.shields.io/badge/SCA-Barony%20of%20the%20Sacred%20Stone-002B49?style=flat-square)](https://sacredstone.atlantia.sca.org/)
[![Kingdom](https://img.shields.io/badge/Kingdom-Atlantia-blue?style=flat-square)](https://atlantia.sca.org/)
[![Stack](https://img.shields.io/badge/Stack-WordPress%20%7C%20PHP%20%7C%20HTML5%20%7C%20CSS3-orange?style=flat-square)](https://github.com/)
[![Code License](https://img.shields.io/badge/Code%20License-Apache%202.0-blue.svg?style=flat-square)](https://www.apache.org/licenses/LICENSE-2.0)
[![Content License](https://img.shields.io/badge/Content%20License-CC%20BY--NC%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Office](https://img.shields.io/badge/Office-Baronial%20Webministry-emerald.svg?style=flat-square)](https://sacredstone.atlantia.sca.org/)

**Baronial Webministry — Kingdom of Atlantia**  
**Webminister / Developer:** Ailís inghean Uí Riagáin (Rebecca Short)  
**Parent Repository:** [Sacred Stone Digital Archive](https://github.com/thepottedhistorian/Sacred_Stone_Digital_Archive)  
**Official Portal:** [sacredstone.atlantia.sca.org](https://sacredstone.atlantia.sca.org/)  

---

## 🏛️ Directory Overview
This directory serves as the centralized source code repository, theme archive, and deployment hub for all public-facing digital web properties maintained by the **Barony of the Sacred Stone Webministry**. 

It houses production-tested WordPress themes for the barony and its cantons alongside dedicated, zero-dependency static event portals. Every asset is structured for long-term maintainability across officer successions, fast loading in remote camping environments, and strict compliance with the Kingdom of Atlantia and SCA Digital Communications policies.

---

## 📁 Repository Directory Structure

```text
website builds/
│
├── Baronial Birthday 2026/             # Dedicated Investiture & Baronial Birthday web portal
│   ├── Assets & Favicons/              # High-DPI app icons, touch icons, and browser favicons
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.gif
│   │   └── favicon.ico
│   │
│   ├── Maps & Visual Layouts/          # Interactive site maps and visual encampment diagrams
│   │   ├── Revision_v2.png             # Site boundary revisions
│   │   ├── SSBB FINAL MAP.html         # Interactive SVG/HTML encampment map viewer
│   │   ├── event-map-20260713-1925.html# Versioned interactive site plan
│   │   └── frick-n-frack.png           # Visual activities locator asset
│   │
│   ├── Pages/                          # Modular event tracks and departmental pages
│   │   ├── Merchants.html              # Merchant row registration, policy, and vendor list
│   │   ├── arts_sciences.html          # A&S competitions, display tables, and scoring rubrics
│   │   ├── championships.html          # Baronial martial and non-martial championship schedules
│   │   ├── classes.html                # University classes, collegium track, and instructor bios
│   │   ├── contact.html                # Autocrat, marshal, and department coordinator contacts
│   │   ├── encampment.html             # Land allocation request forms, group camping guidelines
│   │   ├── feast.html                  # Multi-course feast menu, dietary & allergy disclosures
│   │   ├── martial.html                # Heavy armor, rapier, archery, and thrown weapons rules
│   │   ├── registration.html           # Site fees, pre-registration links, and member discounts
│   │   ├── schedule.html               # Master chronological itinerary across all event days
│   │   └── staff.html                  # Departmental lead rosters and volunteer sign-ups
│   │
│   ├── index.html                      # Primary landing page, announcement reel, and royal notice
│   ├── style.css                       # Responsive CSS layout and heraldic color tokens
│   └── readme.md                       # Build notes, server requirements, and setup guide
│
├── Custom Wordpress Themes/            # Branch themes engineered for the barony and cantons
│   │
│   ├── Barony of the Sacred Stone/     # Official baronial WordPress theme
│   │   ├── 404.php                     # Custom period-themed missing page template
│   │   ├── archive.php                 # Categorized event, chronicle, and court report archives
│   │   ├── footer.php                  # Heraldic footer with required SCA disclaimer notices
│   │   ├── functions.php               # Theme configuration, menu registration, and post hooks
│   │   ├── header.php                  # Global navigation, mobile toggle, and baronial banner
│   │   ├── index.php                   # Primary post loop and announcement fallbacks
│   │   ├── page.php                    # Default full-width and container page layout
│   │   ├── searchform.php              # Styled searchable index form
│   │   ├── single.php                  # Single article view for missives and baronial digests
│   │   ├── style.css                   # Main theme stylesheet (Azure & Gold design tokens)
│   │   └── readme.md                   # Installation guide and widget configuration
│   │
│   ├── Canton of Middlegate/           # Official web theme for the Canton of Middlegate
│   │   ├── 404.php                     # Canton-branded 404 error template
│   │   ├── archive.php                 # Canton meeting minutes and historical news archives
│   │   ├── footer.php                  # Local branch disclaimer and contact footer
│   │   ├── functions.php               # Custom enqueue scripts and navigation definitions
│   │   ├── header.php                  # Middlegate canton badge header and nav container
│   │   ├── index.php                   # Main blog and meeting announcement loop
│   │   ├── page.php                    # Static canton information page template
│   │   ├── searchform.php              # Search component styling
│   │   ├── single.php                  # Single story, polling notice, and dispatch template
│   │   ├── style.css                   # Mobile-first stylesheet with canton green tokens
│   │   └── readme.md                   # Setup instructions and canton branding guidelines
│   │
│   └── readme.md                       # Multi-theme development guidelines and PHP version targets
│
├── Martinmas/                          # Static event portal for Martinmas at the Tavern
│   ├── assets/                         # Graphic banners, parchment textures, and period woodcuts
│   ├── activities.html                 # Period tavern games, brewing displays, and bards
│   ├── arts.html                       # Arts & Sciences competitions and display guidelines
│   ├── feast.html                      # Tavern sideboard, dinner schedule, and allergen matrix
│   ├── index.html                      # Primary tavern entrance portal and royal progress notice
│   ├── martial.html                    # Tournaments, prize play conditions, and marshal inspection
│   ├── registration.html               # Gate reservation rates, payment methods, and deadlines
│   ├── schedule.html                   # Timeline of tournaments, court, and dining
│   ├── staff.html                      # Event autocrats, tavern masters, and kitchen staff
│   └── readme.md                       # St. Martin's Proclamation deployment documentation
│
└── .gitkeep                            # Git directory persistence marker
```

---

## ⚙️ Detailed Module Specifications

### 1. Custom WordPress Themes

#### [Barony of the Sacred Stone](Custom%20Wordpress%20Themes/Barony%20of%20the%20Sacred%20Stone/)
The core production CMS theme powering the baronial web presence at `sacredstone.atlantia.sca.org`.
- **PHP Architecture:** Standardized WordPress template hierarchy (`header.php`, `footer.php`, `index.php`, `single.php`, `archive.php`, `page.php`, `searchform.php`, `404.php`).
- **Engineered Digest Ingestion:** Integrated through `functions.php` to seamlessly render structured event digests sent by the `baronial social tools` automation pipeline.
- **Responsive Layout:** Clean CSS framework (`style.css`) incorporating the Baronial Azure (`#002B49`), Gold (`#FFD700`), and Green (`#1B4D3E`) aesthetic tokens while maintaining fast page load times and strict mobile responsiveness.
- **Policy Compliance:** Embedded footer structures enforcing Kingdom of Atlantia and SCA corporate branding policies.

#### [Canton of Middlegate](Custom%20Wordpress%20Themes/Canton%20of%20Middlegate/)
A dedicated, lightweight branch theme built for the Canton of Middlegate (`middlegate.atlantia.sca.org`).
- **Lightweight Template Hierarchy:** Complete standalone theme files mirrors the baronial engine for ease of maintenance, packaged specifically for canton-level communications.
- **Branch-Specific Identity:** Styled to emphasize the Canton of Middlegate’s badge imagery, meeting locations, and local canton practices.
- **Accessibility & Performance:** Zero external framework bloat, built for clean accessibility and rapid rendering on mobile devices.

---

### 2. Standalone Event Portals

#### [Baronial Birthday 2026](Baronial%20Birthday%202026/)
The official multi-page digital portal engineered for the **Sacred Stone Baronial Birthday & Investiture 2026**.
- **Full Static Modular Architecture:** Built completely with vanilla HTML5, CSS3, and JavaScript, requiring no database backend. It can be hosted from any standard web server or static host.
- **Dedicated Track Pages (`Pages/`):** Dedicated HTML portals covering every facet of the event:
  - `martial.html` & `championships.html`: Tourney formats, authorizations, and list locations.
  - `arts_sciences.html` & `classes.html`: Collegium classroom schedules and A&S display entry rubrics.
  - `encampment.html`: Land reservation forms, merchant applications (`Merchants.html`), and camp guidelines.
  - `feast.html`: Full course menus with detailed ingredient lists for food safety compliance.
  - `registration.html`: Clear gate fees, online pre-registration links, and member discount tiers.
  - `schedule.html`: Comprehensive timeline of courts, martial lists, and workshops.
- **Interactive Mapping System (`Maps & Visual Layouts/`):** Includes standalone HTML map viewers (`SSBB FINAL MAP.html`, `event-map-20260713-1925.html`) for dynamic zoom and layout review, alongside static high-resolution graphics.
- **Complete Favicon Asset Suite (`Assets & Favicons/`):** Full multi-platform icon package ensuring native presentation on iOS Home Screens, Android Chrome, and desktop browser bookmarks.

#### [Martinmas at the Tavern](Martinmas/)
A themed static website created for **Martinmas at the Tavern** (St. Martin's Proclamation).
- **Period Tavern Aesthetic:** Rustic visual design incorporating medieval woodcuts, manuscript parchment textures, and period-inspired typography stored in `assets/`.
- **Targeted Event Pages:** Modular structure with distinct pages for `activities.html` (tavern gaming, bardic circle), `martial.html` (chivalric and rapier prize fights), `feast.html` (sideboard schedule and menu), and `registration.html`.
- **Offline & Cache-Friendly:** Ultra-lightweight footprint allowing attendees to cache the schedule and directions on their mobile devices before arriving at rural, low-connectivity site locations.

---

## 🎨 Visual Identity & Design Tokens

Theme builds adhere to standardized baronial heraldic colors and archival parchment values:

| Token Name | Hex Code | Visual Application |
| :--- | :--- | :--- |
| `--color-baronial-blue` | `#002B49` | Primary headers, navigation bars, and heraldic banners |
| `--color-baronial-gold` | `#FFD700` | Accents, borders, buttons, and callout dividers |
| `--color-baronial-green` | `#1B4D3E` | Secondary buttons, foliage accents, and canton badges |
| `--color-parchment-light` | `#FDFBF7` | Content card backgrounds and reading containers |
| `--color-parchment-aged` | `#EFEAD9` | Tavern containers, footer bars, and aged background fills |
| `--color-ink` | `#1A1A1A` | High-contrast body typography for WCAG AA readability |

---

## 🛠️ Deployment & Maintenance Standards

### 1. WordPress Themes (`Barony of the Sacred Stone` & `Canton of Middlegate`)
1. Create a zip archive containing the individual theme folder files (e.g., `zip -r barony-theme.zip "Custom Wordpress Themes/Barony of the Sacred Stone/*"`).
2. In the target WordPress admin dashboard, navigate to **Appearance > Themes > Add New > Upload Theme**.
3. Activate the theme and configure standard menus under **Appearance > Menus** matching the primary navigation slots registered in `functions.php`.

### 2. Static Event Portals (`Baronial Birthday 2026` & `Martinmas`)
1. Standalone builds utilize relative paths and require no PHP or database dependencies.
2. Upload the entire event folder via SFTP to the target host server directory (e.g., `public_html/events/birthday2026/`) or deploy directly through GitHub Pages.
3. Verify that relative links between the root `index.html` and the `Pages/` or sub-track HTML documents resolve correctly.

### 3. Field Usability & Print Readiness
- **Mobile Caching:** CSS and HTML files avoid heavy frameworks, minimizing load times over cellular connections at remote event sites.
- **Dedicated Print Stylesheets:** All event portals include `@media print` rules within `style.css` so attendees can print clean, ink-friendly copies of schedules, feast menus, and maps directly from their browsers without page clipping.

---

## ⚖️ License & Attribution

```text
Copyright (c) 2026 Rebecca Short (Ailís inghean Uí Riagáin) / Barony of the Sacred Stone
```

This repository contains both automation software and operational documentation. Assets are governed to support open collaboration and technical adoption across SCA branches while protecting original authorship and institutional attribution:

---

### 1. Code Assets (Apache License 2.0)
All WordPress theme PHP scripts (`.php`), frontend stylesheets (`.css`), JavaScript files (`.js`), and HTML markup files (`.html`) are licensed under the **[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)**.

#### Required Attribution & Compliance Guidelines
If you fork, mirror, adapt, or deploy this code for another Barony, Canton, Shire, or Kingdom office, you must satisfy the following terms:
- **Preserve File Headers:** You must retain the original copyright notice, author attribution, and disclaimer blocks at the top of all source files.
- **State Modifications:** Any files modified, altered, or refactored must carry prominent notices and timestamps stating that the files were changed and describing the alterations made.
- **Include License Text:** Any redistribution must include a copy of the Apache 2.0 license or a direct link to the full legal text (`https://www.apache.org/licenses/LICENSE-2.0`).
- **Standard Attribution Notice:** Include credit in your repository `README.md`, theme stylesheets, or website footer:
  > *"Based on web builds originally developed by Ailís inghean Uí Riagáin (Rebecca Short) for the Barony of the Sacred Stone Webministry (Kingdom of Atlantia)."*

---

### 2. Documentation & Written Assets (CC BY-NC 4.0)
All event text, schedules, maps, menu descriptions, layout graphics, and setup documentation are licensed under the **[Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**.

- **Attribution:** When republishing, adapting, or excerpting written materials, guides, or site plans, you must give appropriate credit to **Rebecca Short (Ailís inghean Uí Riagáin)**, provide a link to the license, and indicate if changes were made.
- **Non-Commercial:** Documentation, manuals, and event layouts may not be used, republished, or bundled for commercial or fee-based training purposes.

---

### 3. Heraldic & Institutional Branding Notice
Heraldic artwork, registered armorial devices, badges, ensigns, official officer titles, and branch names associated with the **Barony of the Sacred Stone**, the **Canton of Middlegate**, the **Kingdom of Atlantia**, or the **Society for Creative Anachronism, Inc.** remain the exclusive property of their respective owners. 

These elements are utilized within this repository strictly for official educational, historical, and baronial administrative operations, and are excluded from open-source software licensing grants.

---

## 🏰 SCA Disclaimer
This repository is maintained by volunteers of the **Barony of the Sacred Stone**, a branch of the **Society for Creative Anachronism, Inc. (SCA)**. 

This project is not an official publication of the Society for Creative Anachronism, Inc. and does not necessarily represent the views, official policies, or legal endorsements of the Society or its corporate officers.

---

> *"Technology in service to the Dream."*
