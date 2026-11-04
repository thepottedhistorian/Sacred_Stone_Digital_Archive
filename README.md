# 🛡️ Sacred Stone Digital Archive

[![Branch](https://img.shields.io/badge/SCA-Barony%20of%20the%20Sacred%20Stone-002B49?style=flat-square)](https://sacredstone.atlantia.sca.org/)
[![Kingdom](https://img.shields.io/badge/Kingdom-Atlantia-blue?style=flat-square)](https://atlantia.sca.org/)
[![Runtime](https://img.shields.io/badge/Runtime-Google%20Apps%20Script%20(V8)-4285F4?style=flat-square&logo=google)](https://developers.google.com/apps-script)
[![Web Stack](https://img.shields.io/badge/Stack-WordPress%20%7C%20HTML5%20%7C%20CSS3-orange?style=flat-square)](https://github.com/)
[![License: Apache 2.0](https://img.shields.io/badge/Code%20License-Apache%202.0-blue.svg?style=flat-square)](https://www.apache.org/licenses/LICENSE-2.0)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/Content%20License-CC%20BY--NC%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Office](https://img.shields.io/badge/Office-Baronial%20Webministry-emerald.svg?style=flat-square)](https://sacredstone.atlantia.sca.org/)

**Baronial Webministry — Kingdom of Atlantia**  
**Webminister / Steward:** Ailís inghean Uí Riagáin (Rebecca Short)  
**Official Portal:** [sacredstone.atlantia.sca.org](https://sacredstone.atlantia.sca.org/)

---

## 🏛️ Overview
This repository serves as the official archival space and central code registry for web applications, automation pipelines, and digital administrative infrastructure developed for the **Barony of the Sacred Stone** within the **Kingdom of Atlantia** (Society for Creative Anachronism). 

It acts as an enduring digital scriptorium: cataloging custom Google Workspace tools, front-end event portals, cross-platform communication dispatchers, and administrative utilities that support baronial officers, event autocrats, and the broader populace.

---

## 📁 Project Directory

```text
Sacred_Stone_Digital_Archive/
│
├── baronial social tools/
│   ├── Automation.gs                   # Event processing and scheduled notification dispatchers
│   ├── ChangeLog.gs                    # Release notes and maintenance commit ledger
│   ├── Digest.gs                       # Text parsing and regex extraction routines
│   ├── DigestAutomation.gs             # Automated digest compilation pipeline
│   ├── DigestModal.html                # WordPress event digest generation modal interface
│   ├── Discord.gs                      # Discord webhook payload execution and channel routing
│   ├── DiscordPreview.html             # Rich embed message layout sandbox
│   ├── KingdomTools.gs                 # Atlantian calendar and regional data integrations
│   ├── Main.gs                         # Master trigger router and calendar ID handlers
│   ├── OnlineSync.gs                   # Live event synchronization and description parser
│   ├── README.gs                       # In-script operational documentation and parameter guide
│   ├── UniversalPreview.html           # Cross-platform multi-channel preview modal
│   ├── Z_patches.gs                    # Hotfixes, legacy migrations, and data repair routines
│   ├── appsscript.json                 # Project manifest, OAuth scopes, and V8 runtime configuration
│   ├── gitignore.md                    # Subdirectory exclusion rules
│   └── readme.md                       # Module documentation and workflow guide
│
├── Quartermaster Inventory Portal and Asset Hub/
│   ├── deprecated/                     # Deprecated scripts, schemas, and legacy form handlers
│   ├── Code.gs                         # Apps Script API backend and checkout request engine
│   ├── ImageLinker.gs                  # Automated Drive asset photo linking and thumbnail rendering
│   ├── Readme.md                       # Operational overview, permissions, and deployment guide
│   ├── changelog.gs                    # Revision history and schema evolution ledger
│   └── index.html                      # Frontend responsive portal interface and request form
│
├── website builds/
│   ├── Baronial Birthday 2026/         # Investiture & Baronial Birthday web portal assets
│   ├── Custom Wordpress Themes/        # Branch themes and templates (e.g., Canton of Middlegate)
│   ├── Martinmas/                      # Martinmas at the Tavern registration and info pages
│   └── .gitkeep                        # Git structure persistence placeholder
│
└── README.md                           # Master repository catalog and stewardship standards
```

---

## ⚙️ Module Specifications

### [Baronial Social Tools](baronial%20social%20tools/)
The primary communication and synchronization engine governing baronial calendars, event notifications, and digital dispatches.
- **Event Digest Automation (`Digest.gs`, `DigestAutomation.gs`, `DigestModal.html`):** Extracts, cleans, and compiles upcoming baronial gatherings, guild meetings, and event schedules directly into draft-ready WordPress posts and announcements.
- **Discord Webhook Engine (`Discord.gs`, `DiscordPreview.html`):** Automates structured rich-embed announcements to regional Discord guild channels for scheduled officer meetings, practices, and event deadlines.
- **Calendar & Platform Sync (`Automation.gs`, `Main.gs`, `OnlineSync.gs`, `KingdomTools.gs`):** Connects Google Forms listing requests with Google Calendar, validating scheduling parameters and synchronizing baronial calendars with regional Kingdom tools.
- **Cross-Platform Staging (`UniversalPreview.html`):** Client-side review interface allowing officers to verify layout formatting across email, web, and chat platforms prior to dispatch.

### [Quartermaster Inventory Portal and Asset Hub](Quartermaster%20Inventory%20Portal%20and%20Asset%20Hub/)
A dedicated internal logistics and asset tracking system designed for managing the barony's physical equipment, feast gear, pavilion hardware, and historical regalia.
- **Apps Script Core (`Code.gs`):** Handles asset intake, multi-item checkout validation, borrowing duration enforcement, and condition auditing.
- **Media Ingestion (`ImageLinker.gs`):** Automates Google Drive photo URL normalization to render dynamic catalog thumbnails directly within the inventory interface.
- **Borrower Portal (`index.html`):** Responsive client-side interface allowing populaces and autocrats to browse available equipment, submit checkout requisitions, and review baronial loan policies.
- **Archival Reference (`deprecated/`, `changelog.gs`):** Retains legacy version histories and deprecated forms to preserve institutional memory across officer successions.

### [Website Builds](website%20builds/)
Production packages, responsive event sub-sites, and custom content management themes utilized across the barony.
- **Baronial Birthday 2026:** Event landing portal and registration hub supporting the 2026 Baronial Birthday & Investiture celebration.
- **Custom WordPress Themes:** Branch child themes, templates, and styling assets developed for baronial cantons and administrative hubs, including the **Canton of Middlegate**.
- **Martinmas at the Tavern:** Targeted event microsite containing site information, feast details, schedule of activities, and pre-registration instructions.

---

## 📜 Stewardship Guidelines & System Architecture
This archive is maintained by the **Barony of the Sacred Stone Webministry**. All tools and digital assets hosted here are engineered to support the educational, historical, and organizational mission of the Society for Creative Anachronism.

### Security & Credential Hygiene
- **Zero Plaintext Secrets:** Sensitive identifiers, database spreadsheet IDs, Discord webhook URLs, and API tokens are never committed to version control.
- **Runtime Isolation:** All backend scripts read configuration variables via `PropertiesService.getScriptProperties()` to maintain isolation between public documentation and deployment environments.

### Archival Documentation Standards
- Each sub-project includes dedicated documentation (`readme.md`, `README.gs`, or equivalent) outlining operational triggers, deployment prerequisites, and workflow architectures.
- Code is commented and structured to ensure seamless handoffs between incoming and outgoing Baronial Webministers.

### Policy Compliance
- Systems are developed and reviewed in compliance with the **SCA Kingdom of Atlantia Webministry Policy** and the **Society Digital Communications Policy**.

---

## ⚖️ License & Attribution

This repository contains software source code, operational documentation, heraldic art, and administrative text. Assets are governed under dual-licensing terms:

### 1. Non-Code Assets
*(Artwork, Graphics, Research, Documentation, PDFs, and Written Content)*

Unless otherwise noted, non-code assets within this archive are licensed under the  
**[Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**.

You are free to:
- **Share:** Copy and redistribute the material in any medium or format.
- **Adapt:** Remix, transform, and build upon the material.

Under the following terms:
- **Attribution:** You must give appropriate credit to the original creator, provide a link to the license, and indicate whether changes were made.
- **NonCommercial:** You may not use the material for commercial purposes without express written permission of the copyright holder.

> **SCA Heraldry & Branding Notice:**  
> Heraldic artwork, badges, arms, names, logos, and other protected symbols associated with the Barony of the Sacred Stone, the Kingdom of Atlantia, or the Society for Creative Anachronism, Inc. remain the property of their respective owners and are reproduced here for official educational, historical, and administrative purposes.

### 2. Code Assets
*(Scripts, Automation Pipelines, HTML5/CSS3 Interfaces, JavaScript, Google Apps Script, and Web Templates)*

All software source code contained within this repository is licensed under the **Apache License, Version 2.0**:

```text
Copyright (c) 2026 Rebecca Short (Ailís inghean Uí Riagáin) / Barony of the Sacred Stone

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    [https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

## 🏰 SCA Disclaimer
This repository is maintained by volunteers of the **Barony of the Sacred Stone**, a branch of the **Society for Creative Anachronism, Inc.**

This project is not an official publication of the Society for Creative Anachronism, Inc. and does not necessarily represent the views or policies of the Society or its officers.

---

> *"To preserve the history of the present for the benefit of the future."*
