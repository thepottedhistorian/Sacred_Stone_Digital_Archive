# 🏰 Barony of the Sacred Stone — Custom WordPress Theme

![Version](https://img.shields.io/badge/version-0.1.3-1b3b22?style=flat-square&logo=wordpress&logoColor=white)
![Status](https://img.shields.io/badge/status-Active--Production-success?style=flat-square)
![Platform](https://img.shields.io/badge/platform-WordPress-21759B?style=flat-square&logo=wordpress)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-777BB4?style=flat-square&logo=php)
![Kingdom](https://img.shields.io/badge/SCA-Kingdom%20of%20Atlantia-c5a880?style=flat-square)
![Maintainer](https://img.shields.io/badge/maintained%20by-Baronial%20Webministry-122617?style=flat-square)

---

## 📋 Overview

The **Sacred Stone Minimalist Theme** is a custom, high-performance WordPress theme engineered specifically for the **Barony of the Sacred Stone** (SCA, Inc.). 

Designed around a "Digital Scriptorium & Archival Parchment" aesthetic, the theme pairs rich baronial heraldic tones (Deep Green `#004d26` and Gold `#d4af37`) with full Gutenberg block support, custom award medallion roundels, officer contact card layouts, and responsive archival search templates.

* **Live Site Target:** [https://sacredstone.atlantia.sca.org/](https://sacredstone.atlantia.sca.org/)
* **Theme Directory:** `/wp-content/themes/sacred-stone/`

---

## ⚡ Core Features & Technical Highlights

* **Archival Design Language:** Custom CSS styling built around an antique ivory parchment palette (`#F1E9D2`), fixed heraldic background wallpapers, and gold rule dividers (`--baronial-gold`).
* **Gutenberg Block Extensions:** Native styling for `.callout-card`, `.motto-banner`, `.officer-card` 3-column equalized grids, `.award-card` medallion roundels, and zebra-striped history tables.
* **Scriptorium 404 & Search Engine:** Custom `404.php` error template ("Lost in the Scriptorium") and `searchform.php` featuring FontAwesome 6 magnifying glass inputs.
* **Accessible Navigation:** Accessible skip links (`.skip-link`), multi-level flyout submenus (`.flyout-left`), and aria-expanded hamburger toggle scripts for mobile viewports.
* **SCA Policy Compliance:** Integrated footer disclaimer blocks covering SCA, Inc. copyright reversions, electronic newsletter notices, and Conduct & Anti-Bullying policy links.

---

## 📂 Theme Directory Structure

```text
sacred-stone/
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
