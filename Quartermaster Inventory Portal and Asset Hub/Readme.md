# Barony of the Sacred Stone — Quartermaster Portal

![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-SCA%20Internal-lightgrey)

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
