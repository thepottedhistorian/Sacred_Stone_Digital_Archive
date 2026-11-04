# 🏰 Sacred Stone Custom WordPress Themes

[![Branch](https://img.shields.io/badge/SCA-Barony%20of%20the%20Sacred%20Stone-002B49?style=flat-square)](https://sacredstone.atlantia.sca.org/)
[![Kingdom](https://img.shields.io/badge/Kingdom-Atlantia-blue?style=flat-square)](https://atlantia.sca.org/)
[![CMS](https://img.shields.io/badge/CMS-WordPress%206.x-21759B?style=flat-square&logo=wordpress&logoColor=white)](https://wordpress.org/)
[![Stack](https://img.shields.io/badge/Stack-PHP%20%7C%20HTML5%20%7C%20CSS3-777BB4?style=flat-square&logo=php&logoColor=white)](https://github.com/)
[![Code License](https://img.shields.io/badge/Code%20License-Apache%202.0-blue.svg?style=flat-square)](https://www.apache.org/licenses/LICENSE-2.0)
[![Content License](https://img.shields.io/badge/Content%20License-CC%20BY--NC%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Office](https://img.shields.io/badge/Office-Baronial%20Webministry-emerald.svg?style=flat-square)](https://sacredstone.atlantia.sca.org/)

**Baronial Webministry — Kingdom of Atlantia**  
**Webminister / Developer:** Ailís inghean Uí Riagáin (Rebecca Short)  
**Parent Repository:** [Sacred Stone Digital Archive](https://github.com/thepottedhistorian/Sacred_Stone_Digital_Archive)  
**Parent Directory:** [`website builds/`](../)  

---

## 🏛️ Directory Overview
This directory serves as the centralized source code repository for custom WordPress themes engineered for the **Barony of the Sacred Stone** and its constituent branches (including the **Canton of Middlegate**). 

Unlike commercial multi-purpose themes that carry substantial database overhead, visual page builder bloat, and external script dependencies, these themes are custom-built to be lightweight, secure, and accessible. They prioritize:
- **Instantaneous Rendering:** Fast page loads on cellular devices and rural event sites.
- **Strict Policy Compliance:** Embedded heraldic banners, officer contact forms, and legal disclaimers conforming to the SCA Kingdom of Atlantia Webministry Policy.
- **Workflow Interoperability:** Native typography and CSS containers tailored to ingest automated posts and weekly digests dispatched via the `baronial social tools` Google Apps Script pipeline.

---

## 📁 Directory Structure

```text
Custom Wordpress Themes/
│
├── Barony of the Sacred Stone/         # Production theme for sacredstone.atlantia.sca.org
│   ├── 404.php                         # Period-themed missing page template
│   ├── archive.php                     # Category, tag, and chronological article loop
│   ├── footer.php                      # Heraldic footer, officer notices, and legal disclaimers
│   ├── functions.php                   # Theme setup, nav menus, widget areas, and digest hooks
│   ├── header.php                      # Semantic header, meta viewport, navigation, and banner
│   ├── index.php                       # Default post loop and fallback layout
│   ├── page.php                        # Standard static content page template
│   ├── searchform.php                  # Accessible site search form component
│   ├── single.php                      # Dedicated view for individual news posts and missives
│   ├── style.css                       # Primary stylesheet (Azure, Gold, and Parchment design tokens)
│   └── readme.md                       # Branch deployment and widget configuration notes
│
├── Canton of Middlegate/               # Production theme for middlegate.atlantia.sca.org
│   ├── 404.php                         # Canton-branded 404 error template
│   ├── archive.php                     # Canton meeting minutes and historical announcement archives
│   ├── footer.php                      # Local branch disclaimer and contact footer
│   ├── functions.php                   # Theme setup and canton menu definitions
│   ├── header.php                      # Middlegate badge header and responsive nav toggle
│   ├── index.php                       # Primary announcement loop and meeting schedule
│   ├── page.php                        # Static informational page template
│   ├── searchform.php                  # Search input component
│   ├── single.php                      # Single dispatch and event report view
│   ├── style.css                       # Canton mobile-first stylesheet (Forest Green tokens)
│   └── readme.md                       # Canton theme guide and installation instructions
│
└── readme.md                           # Master theme architecture and deployment guide
```

---

## ⚙️ Theme Specifications & Capabilities

### 1. Barony of the Sacred Stone (`sacredstone.atlantia.sca.org`)
The flagship digital gateway for the barony.
- **Heraldic Design Tokens:** Standardizes colors to Baronial Azure (`#002B49`), Heraldic Gold (`#FFD700`), and Archival Parchment (`#FDFBF7`).
- **Officer & Regalia Staging:** Custom templates cleanly separate administrative officer rosters, baronage missives, order of precedence links, and baronial financial forms.
- **Digest Automation Hooks:** Pre-styled selectors for classes generated by `DigestModal.html`, ensuring weekly event digests published via the WordPress REST API format instantly without manual block adjustments.

### 2. Canton of Middlegate (`middlegate.atlantia.sca.org`)
A focused branch theme for the Canton of Middlegate.
- **Branch Identity:** Tailored around the Canton of Middlegate’s badge, meetings schedule, local practice sites, and autocrat contact directories.
- **Lightweight Footprint:** Zero third-party JavaScript framework dependencies; relies strictly on vanilla HTML5 and CSS3 to ensure rapid loads even on restricted mobile networks.
- **Independent Autonomy:** Functions completely independently from the main baronial theme while retaining visual harmony and Atlantian web policy compliance.

---

## 🎨 Shared Design Tokens & Typography

All themes in this directory adhere to the following CSS variable hierarchy defined in `style.css`:

```css
:root {
  /* Heraldic Color Tokens */
  --color-primary: #002B49;       /* Baronial Azure */
  --color-accent: #FFD700;        /* Heraldic Gold */
  --color-secondary: #1B4D3E;     /* Baronial Green */
  --color-parchment: #FDFBF7;     /* Clean Card Background */
  --color-parchment-deep: #EFEAD9;/* Aged Container Background */
  --color-text-dark: #1A1A1A;     /* WCAG AA Compliant Charcoal */
  --color-border: #D1C7AC;        /* Muted Heraldic Border */

  /* Structural Spacing */
  --max-content-width: 1200px;
  --header-height: 80px;
  --border-radius: 4px;
}
```

---

## 🛠️ Installation & Deployment

### Method 1: WordPress Administrative Dashboard (.zip)
1. Navigate to the desired theme directory (`Barony of the Sacred Stone/` or `Canton of Middlegate/`).
2. Package the directory files into a `.zip` archive (do not nest an extra outer folder).
3. In the WordPress Admin dashboard, go to **Appearance > Themes > Add New > Upload Theme**.
4. Choose the zip file, click **Install Now**, and click **Activate**.

### Method 2: SFTP Deployment (Kingdom Server)
1. Connect to the Kingdom of Atlantia web host via SFTP.
2. Navigate to the WordPress installation directory:
   ```text
   /public_html/wp-content/themes/
   ```
3. Upload the theme folder directly:
   - `/public_html/wp-content/themes/barony-sacred-stone/`
   - `/public_html/wp-content/themes/canton-middlegate/`
4. Log into WordPress Admin, go to **Appearance > Themes**, and activate the uploaded theme.

---

## 🔧 Recommended WordPress Configuration

- **PHP Version:** PHP 8.0, 8.1, or 8.2.
- **Permalinks:** Set to **Post name** (`/%postname%/`) under *Settings > Permalinks* for clean SEO-friendly URLs.
- **Navigation Menus:** Set up primary navigation slots via **Appearance > Menus** matching the locations registered in `functions.php`:
  - `primary-menu` — Global Desktop & Mobile Navigation
  - `officer-menu` — Quick Links / Officer Administrative Submenu
- **Security:** Fully compatible with Wordfence Security and standard Kingdom server `.htaccess` directives.

---

## ⚖️ License & Attribution

```text
Copyright (c) 2026 Rebecca Short (Ailís inghean Uí Riagáin) / Barony of the Sacred Stone
```

This repository contains both software source code and administrative creative assets. Assets are governed to encourage open sharing between SCA branches while safeguarding original design and heraldic attribution:

---

### 1. Code Assets (Apache License 2.0)
All WordPress theme PHP scripts (`.php`), stylesheets (`.css`), JavaScript functions (`.js`), and HTML components are licensed under the **[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)**.

#### Required Attribution & Compliance Guidelines
If you fork, adapt, or utilize these themes for another Barony, Canton, Shire, or Kingdom branch:
- **Preserve File Headers:** Retain the original copyright notice, author attribution, and disclaimer comments in `style.css` and all PHP template files.
- **State Modifications:** Any files modified or customized must carry prominent notices indicating what changes were made.
- **Include License Text:** Any redistribution must include a copy of the Apache 2.0 license or a direct link to the full legal text (`https://www.apache.org/licenses/LICENSE-2.0`).
- **Standard Attribution Notice:** Include credit in your theme stylesheet header or website footer:
  > *"Based on custom WordPress themes originally developed by Ailís inghean Uí Riagáin (Rebecca Short) for the Barony of the Sacred Stone Webministry (Kingdom of Atlantia)."*

---

### 2. Non-Code & Creative Assets (CC BY-NC 4.0)
All documentation, guides, written articles, page layouts, and instructional materials are licensed under the **[Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**.

- **Attribution:** When adapting or excerpting documentation or manuals, credit **Rebecca Short (Ailís inghean Uí Riagáin)**, link to the license, and state if changes were made.
- **Non-Commercial:** These materials may not be used, sold, or packaged for commercial purposes outside of official Society activities.

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
