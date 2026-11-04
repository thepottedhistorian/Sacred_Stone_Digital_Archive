# Barony of the Sacred Stone — Quartermaster Portal

[![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script%20(V8)-4285F4?style=flat-square&logo=google)](https://developers.google.com/apps-script)
[![Runtime](https://img.shields.io/badge/Stack-GAS%20%7C%20HTML5%20%7C%20CSS3-orange?style=flat-square)](https://github.com/thepottedhistorian/Sacred_Stone_Digital_Archive)
[![Branch](https://img.shields.io/badge/SCA-Barony%20of%20the%20Sacred%20Stone-002B49?style=flat-square)](https://sacredstone.atlantia.sca.org/)
[![Status](https://img.shields.io/badge/Status-Production%20Active-brightgreen?style=flat-square)](https://github.com/thepottedhistorian/Sacred_Stone_Digital_Archive)
[![Code License](https://img.shields.io/badge/Code%20License-Apache%202.0-blue.svg?style=flat-square)](https://www.apache.org/licenses/LICENSE-2.0)
[![Assets License](https://img.shields.io/badge/Content%20License-CC%20BY--NC%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)

A dedicated Google Apps Script (GAS) web application powering the Barony of the Sacred Stone's Master Inventory and Asset Request Hub. This portal bridges the live Master Inventory Google Spreadsheet with a responsive, mobile-friendly frontend to handle real-time item tracking, status filtering, photo previews, automated liability checkouts, and routed email notifications.

**Project Steward / Original Author:** Ailís inghean Uí Riagáin (Baronial Webminister)  
**Repository Maintainer:** Rebecca Short  
**Official Portal:** [sacredstone.atlantia.sca.org](https://sacredstone.atlantia.sca.org/)  

---

## Technical Metadata

| Attribute | Details |
| :--- | :--- |
| **Project** | Barony of the Sacred Stone — Quartermaster Portal |
| **Maintainer** | Ailís inghean Uí Riagáin (Rebecca Short) |
| **Created** | July 2026 |
| **Last Updated** | September 2026 |
| **Platform** | Google Apps Script (Chrome V8 Runtime) |
| **Integration** | Google Sheets, Google Drive, GmailApp |

---

## System Architecture

### 1. Backend Controller (`Code.gs`)
- **Routing:** Serves the frontend interface via `doGet(e)`.
- **Data Parsing:** Parses and flattens the 18-column Master Inventory schema into structured JSON objects via `getInventoryData()` for fast client-side rendering.
- **Logging:** Provisions and appends asset checkout requests directly to the `Checkout Log` tab with a default status of "Pending Approval".
- **Notification Routing:** Dispatches automated email notifications to the Quartermaster while sending immediate confirmation copies to requesters.

### 2. Frontend Interface (`Index.html`)
- **Styling & Theme:** Customized CSS architecture built on Baronial Green and archival parchment tones.
- **Client-Side Processing:** Dynamic search indexing, category filtering, and status filtering (*In Storage* vs. *Signed Out*).
- **Media & Modals:** Side-by-side high-resolution photo previews, storage location drawers (Olympic Crown Storage, Salisbury, NC), Borrower Terms, color-coded Status/Condition glossaries, and System Release Notes.
- **Policy Disclaimers:** Integrated prominent notices clarifying that item checkout requests log an inquiry subject to officer review and do not constitute automatic asset issuance.

### 3. Media Utility (`ImageLinker.gs`)
- **Drive Folder Crawling:** Utility engine that crawls designated Google Drive image folders and maps web-ready thumbnail URLs (`lh3.googleusercontent.com`) into Columns O & P across category tabs to bypass browser cross-origin frame blocks.

---

## Configuration & Security

To prevent hardcoded credentials and maintain security, all environment targets are stored in **Script Properties** (*Project Settings > Script Properties*):

| Property Key | Description | Example / Target Format |
| :--- | :--- | :--- |
| `SPREADSHEET_ID` | Unique alphanumeric ID for the Master Inventory Google Sheet. | `YOUR_SPREADSHEET_ID_HERE` |
| `QUARTERMASTER_EMAIL` | Primary recipient for asset checkout request notifications. | `quartermaster@sacredstone.atlantia.sca.org` |
| `WEBMINISTER_EMAIL` | Technical backup contact (CC'd on notifications). | `webminister@sacredstone.atlantia.sca.org` |
| `EXCHEQUER_EMAIL` | Financial oversight contact (CC'd on notifications). | `exchequer@sacredstone.atlantia.sca.org` |

```javascript
function configureQuartermasterProperties() {
  PropertiesService.getScriptProperties().setProperties({
    'SPREADSHEET_ID': 'YOUR_SPREADSHEET_ID_HERE',
    'QUARTERMASTER_EMAIL': 'YOUR_QUARTERMASTER_EMAIL',
    'WEBMINISTER_EMAIL': 'YOUR_WEBMINISTER_EMAIL',
    'EXCHEQUER_EMAIL': 'YOUR_EXCHEQUER_EMAIL'
  });
}
```

---

## Operational Workflows

### Item Checkouts & Issuance Terms
1. Event Stewards select items via the web portal interface.
2. Stewards review the **Notice on Request Approvals**, acknowledging that submitting a request logs an inquiry for review and does not constitute automatic approval or immediate gear issuance. All allocations—especially restricted officer regalia and high-value baronial assets—remain subject to formal review and officer verification.
3. Stewards review the **Financial Liability Acknowledgement** terms and agree to Baronial and Financial policies.
4. Upon submission, event details are logged and routed.

### Logging & Routing
1. Submissions immediately append to the `Checkout Log` sheet tab with a status of "Pending Approval".
2. An automated double-dispatch email summarizes requested item IDs, contact information, and event dates to the designated officers and the requester.

### Bulk Requests
- Multi-item allocations utilize the linked standalone PDF form.
- Physical pickups are coordinated at Olympic Crown Storage in Salisbury, NC, followed by formal sign-out with the Quartermaster.

---

## File Structure

```text
Quartermaster Inventory Portal and Asset Hub/
├── Code.gs             # Backend logic, sheet parsing, doGet routing, and mail handlers
├── Index.html          # Main UI markup, client scripts, modals, and embedded styles
├── ImageLinker.gs      # Drive folder crawler and batch image thumbnail linker
├── Changelog.gs        # In-app version release notes binder
├── Readme.gs           # Architectural notes and developer documentation
├── appsscript.json     # Apps Script project manifest and V8 runtime configuration
└── deprecated/         # Legacy pre-v1.5.0 controllers retained for archival audit
    ├── Master Inventory Builder.gs
    ├── Master Inventory Sync.gs
    └── README.md
```

---

## ⚖️ License & Attribution

```text
Copyright (c) 2026 Rebecca Short (Ailís inghean Uí Riagáin) / Barony of the Sacred Stone
```

This repository contains both automation software and operational documentation. Assets are governed to support open collaboration and technical adoption across SCA branches while protecting original authorship and institutional attribution:

---

### 1. Code Assets (Apache License 2.0)
All Google Apps Script backend files (`.gs`), HTML/CSS interfaces (`.html`), JSON manifests (`appsscript.json`), and client-side automation logic are licensed under the **[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)**.

#### Required Attribution & Compliance Guidelines
If you fork, mirror, adapt, or deploy this code for another Barony, Canton, Shire, or Kingdom office, you must satisfy the following terms:
- **Preserve File Headers:** You must retain the original copyright notice, author attribution, and disclaimer blocks at the top of all source script files (`Code.gs`, `ImageLinker.gs`, `Changelog.gs`, etc.).
- **State Modifications:** Any files modified, altered, or refactored must carry prominent notices and timestamps stating that the files were changed and describing the alterations made.
- **Include License Text:** Any redistribution must include a copy of the Apache 2.0 license or a direct link to the full legal text (`https://www.apache.org/licenses/LICENSE-2.0`).
- **Standard Attribution Notice:** Include credit in your repository `README.md`, script headers, or application UI:
  > *"Based on Quartermaster Inventory Portal and Asset Hub originally developed by Ailís inghean Uí Riagáin (Rebecca Short) for the Barony of the Sacred Stone Webministry (Kingdom of Atlantia)."*

---

### 2. Documentation & Written Assets (CC BY-NC 4.0)
All operational guides, installation walkthroughs, changelog ledgers, markdown manuals, and setup documentation are licensed under the **[Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**.

- **Attribution:** When republishing, adapting, or excerpting training materials, manuals, or workflow diagrams, you must give appropriate credit to **Rebecca Short (Ailís inghean Uí Riagáin)**, provide a link to the license, and indicate if changes were made.
- **Non-Commercial:** Documentation, manuals, and instructional text may not be used, republished, or bundled for commercial or fee-based training purposes.

---

### 3. Heraldic & Institutional Branding Notice
Heraldic artwork, registered armorial devices, badges, ensigns, official officer titles, and branch names associated with the **Barony of the Sacred Stone**, the **Kingdom of Atlantia**, or the **Society for Creative Anachronism, Inc.** remain the exclusive property of their respective owners. 

These elements are utilized within this repository strictly for official educational, historical, and baronial administrative operations, and are excluded from open-source software licensing grants.

---

## 🏰 SCA Disclaimer
This repository is maintained by volunteers of the **Barony of the Sacred Stone**, a branch of the **Society for Creative Anachronism, Inc. (SCA)**. 

This project is not an official publication of the Society for Creative Anachronism, Inc. and does not necessarily represent the views, official policies, or legal endorsements of the Society or its corporate officers.

---

> *"Technology in service to the Dream."*
