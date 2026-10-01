# 🏰 Canton of Middlegate — Custom WordPress Theme

![Version](https://img.shields.io/badge/version-0.1.0-8B0000?style=flat-square&logo=wordpress&logoColor=white)
![Status](https://img.shields.io/badge/status-Active--Production-success?style=flat-square)
![Platform](https://img.shields.io/badge/platform-WordPress-21759B?style=flat-square&logo=wordpress)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-777BB4?style=flat-square&logo=php)
![Kingdom](https://img.shields.io/badge/SCA-Kingdom%20of%20Atlantia-c5a880?style=flat-square)
![Barony](https://img.shields.io/badge/Barony-Sacred%20Stone-1b3b22?style=flat-square)
![Maintainer](https://img.shields.io/badge/maintained%20by-Canton%20Webministry-122617?style=flat-square)

---

## 📋 Overview

The **Canton of Middlegate Minimalist Theme** is a custom, high-performance WordPress theme engineered specifically for the **Canton of Middlegate** (Barony of the Sacred Stone, Kingdom of Atlantia, SCA, Inc.).

Designed around a "Digital Scriptorium & Archival Parchment" aesthetic, the theme pairs rich heraldic red (`#8B0000`, derived from the Canton portcullis badge) and gold (`#D4AF37`) with full Gutenberg block support, custom callout cards, officer contact layouts, and responsive archival search templates.

* **Live Site Target:** [https://middlegate.atlantia.sca.org/](https://middlegate.atlantia.sca.org/)
* **Theme Directory:** `/wp-content/themes/canton-middlegate/`

---

## ⚡ Core Features & Technical Highlights

* **Archival Design Language:** Custom CSS styling built around an antique ivory parchment palette (`#F1E9D2`), fixed heraldic background wallpapers, and gold rule dividers (`--middlegate-gold`).
* **Gutenberg Block Extensions:** Native styling for `.callout-card`, `.motto-banner`, `.calendar-tab-container`, and zebra-striped history tables.
* **Scriptorium 404 & Search Engine:** Custom `404.php` error template ("Lost in the Scriptorium") and `searchform.php` featuring FontAwesome 6 magnifying glass inputs.
* **Accessible Navigation:** Accessible skip links (`.skip-link`), multi-level flyout submenus (`.flyout-left`), and aria-expanded hamburger toggle scripts for mobile viewports.
* **SCA Policy Compliance:** Integrated footer disclaimer blocks covering SCA, Inc. copyright reversions, electronic newsletter notices, and Conduct & Anti-Bullying policy links.

---

## 📂 Theme Directory Structure

```text
canton-middlegate/
├── style.css             # Main stylesheet (Global reset, variables, Gutenberg blocks & media queries)
├── functions.php         # Theme setup, nav menu registration, script/style enqueuing
├── header.php            # Accessible head markup, clickable header banner link & primary nav bar
├── footer.php            # 3-Column footer grid, SCA disclaimers, social links & hamburger JS toggle
├── index.php             # Fallback template for post lists and archival archives
├── page.php              # Template for displaying static pages
├── single.php            # Template for displaying individual blog posts / news items
├── archive.php           # Template for displaying category, tag, and date archive lists
├── 404.php               # Scriptorium-themed 404 page ("Lost in the Scriptorium")
└── searchform.php        # Custom archival search input form template
