# Barony of the Sacred Stone — Quartermaster Portal

![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Code License](https://img.shields.io/badge/Code-Apache%202.0-blue)
![Assets License](https://img.shields.io/badge/Assets-CC%20BY--NC%204.0-green)


A Google Apps Script (GAS) web application powering the Barony of the Sacred Stone's Master Inventory and Asset Request Hub. This portal bridges the live Master Inventory Google Spreadsheet with a responsive, mobile-friendly frontend to handle real-time item tracking, status filtering, photo previews, automated liability checkouts, and routed email notifications.

---

## Technical Metadata

| Attribute | Details |
| :--- | :--- |
| **Project** | Barony of the Sacred Stone — Quartermaster Portal |
| **Maintainer** | Ailís inghean Uí Riagáin (Baronial Webminister) |
| **Created** | July 2026 |
| **Last Updated** | September 2026 |
| **Platform** | Google Apps Script (GAS) |

---

## System Architecture

### 1. Backend Controller (`Code.gs`)
* **Routing:** Serves the frontend interface via `doGet(e)`.
* **Data Parsing:** Parses and flattens the 18-column Master Inventory schema into structured JSON objects via `getInventoryData()` for fast client-side rendering.
* **Logging:** Provisions and appends asset checkout requests directly to the `Checkout Log` tab with a default status of "Pending Approval".
* **Notification Routing:** Dispatches automated email notifications to the Quartermaster while sending immediate confirmation copies to requesters.

### 2. Frontend Interface (`Index.html`)
* **Styling & Theme:** Customized CSS architecture built on Baronial Green and archival parchment tones.
* **Client-Side Processing:** Dynamic search indexing, category filtering, and status filtering (*In Storage* vs. *Signed Out*).
* **Media & Modals:** Side-by-side high-resolution photo previews, storage location drawers (Olympic Crown Storage, Salisbury, NC), Borrower Terms, color-coded Status/Condition glossaries, and System Release Notes.
* **Policy Disclaimers:** Integrated prominent notices clarifying that item checkout requests log an inquiry subject to officer review and do not constitute automatic asset issuance.

### 3. Media Utility (`ImageLinker.gs`)
* **Drive Folder Crawling:** Utility engine that crawls designated Google Drive image folders and maps web-ready thumbnail URLs (`lh3.googleusercontent.com`) into Columns O & P across category tabs to bypass browser cross-origin frame blocks.

---

## Configuration & Security

To prevent hardcoded credentials and maintain security, all environment targets are stored in **Script Properties** (*Project Settings > Script Properties*):

| Property Key | Description |
| :--- | :--- |
| `SPREADSHEET_ID` | Unique alphanumeric ID for the Master Inventory Google Sheet. |
| `QUARTERMASTER_EMAIL` | Primary recipient for asset checkout request notifications. |
| `WEBMINISTER_EMAIL` | Technical backup contact (CC'd on notifications). |
| `EXCHEQUER_EMAIL` | Financial oversight contact (CC'd on notifications). |

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
* Multi-item allocations utilize the linked standalone PDF form.
* Physical pickups are coordinated at Olympic Crown Storage in Salisbury, NC, followed by formal sign-out with the Quartermaster.

---

## File Structure

```text
├── Code.gs             # Backend logic, sheet parsing, doGet routing, and mail handlers
├── Index.html          # Main UI markup, client scripts, modals, and embedded styles
├── ImageLinker.gs      # Drive folder crawler and batch image thumbnail linker
├── Changelog.gs        # In-app version release notes binder
├── Readme.gs           # Architectural notes and developer documentation
├── appsscript.json     # Apps Script project manifest
└── deprecated/         # Legacy pre-v1.5.0 controllers retained for archival audit
    ├── Master Inventory Builder.gs
    ├── Master Inventory Sync.gs
    └── README.md
```

---

## ⚖️ License & Attribution

This project contains both software code and administrative documentation. Different asset types are licensed under different terms.

### Code License

All source code contained within this project, including but not limited to:

- `Code.gs`
- `Index.html`
- `ImageLinker.gs`
- `Changelog.gs`
- `appsscript.json`
- Supporting scripts and utilities

is licensed under the **Apache License 2.0**.

https://www.apache.org/licenses/LICENSE-2.0

```text
Copyright (c) 2026 Rebecca Short
(Ailís inghean Uí Riagáin) / Barony of the Sacred Stone

Licensed under the Apache License, Version 2.0.
```

You are free to use, modify, distribute, and adapt the software in accordance with the Apache 2.0 License.

---

### Documentation & Non-Code Assets

All documentation, written content, workflow descriptions, screenshots, diagrams, PDFs, instructional materials, and other non-code assets are licensed under:

**Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**

https://creativecommons.org/licenses/by-nc/4.0/

You are free to:

- **Share** the material in any medium or format.
- **Adapt** and build upon the material.

Under the following terms:

- **Attribution** must be provided to the original creator.
- **NonCommercial** use only unless explicit written permission is granted.

---

### SCA Heraldry & Intellectual Property Notice

Names, heraldry, badges, arms, logos, and other protected insignia associated with:

- The Barony of the Sacred Stone
- The Kingdom of Atlantia
- The Society for Creative Anachronism, Inc.

remain the property of their respective owners and are reproduced here for official educational, historical, and administrative purposes.

Use of SCA heraldic and organizational imagery does not grant permission for independent reproduction or commercial use.

---

## Attribution

**Project Steward / Original Author**  
Ailís inghean Uí Riagáin  
Baronial Webminister, Barony of the Sacred Stone

**Repository Maintainer**  
Rebecca Short

Contributions, modifications, and derivative works should retain attribution to the original project authors and the Barony of the Sacred Stone whenever practical.

---

*"Technology in service to the Dream."*
