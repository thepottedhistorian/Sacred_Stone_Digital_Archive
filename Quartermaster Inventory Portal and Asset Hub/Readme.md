# Barony of the Sacred Stone — Quartermaster Portal

![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script-4285F4?style=flat-square&logo=google-apps-script&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-SCA%20Internal-blue?style=flat-square)

A Google Apps Script (GAS) web application powering the Barony of the Sacred Stone's Master Inventory and Asset Request Hub. This portal bridges the live Master Inventory Google Spreadsheet with a responsive, mobile-friendly frontend to handle real-time item tracking, status filtering, photo previews, automated liability checkouts, and routed email notifications.

---

## Technical Metadata

| Attribute | Details |
| :--- | :--- |
| **Project** | Barony of the Sacred Stone — Quartermaster Portal |
| **Maintainer** | Ailis inghean Uí Riagáin (Baronial Webminister) |
| **Created** | July 2026 |
| **Last Updated** | August 2026 |
| **Platform** | Google Apps Script (GAS) |

---

## System Architecture

### 1. Backend Controller (`Code.gs`)
* **Routing:** Serves the frontend interface via `doGet(e)`.
* **Data Parsing:** Parses and flattens the 18-column Master Inventory schema into structured JSON objects via `getInventoryData()` for fast client-side rendering.
* **Logging:** Provisions and appends asset checkout requests directly to the `Checkout Log` tab.
* **Notification Routing:** Dispatches automated email notifications to the Quartermaster, Exchequer, and Webminister.

### 2. Frontend Interface (`Index.html`)
* **Styling & Theme:** Customized CSS architecture built on Baronial Green and archival parchment tones.
* **Client-Side Processing:** Dynamic search indexing, category filtering, and status filtering (*In Storage* vs. *Signed Out*).
* **Media & Modals:** Side-by-side high-resolution photo previews, storage location drawers (Olympic Crown Storage, Salisbury, NC), Borrower Terms, color-coded Status/Condition glossaries, and System Release Notes.

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

### Item Checkouts
1. Event Stewards select items via the web portal interface.
2. Stewards review the Financial Liability Acknowledgement terms and agree to Baronial and Financial policies.
3. Upon submission, event details are logged and routed.

### Logging & Routing
1. Submissions immediately append to the `Checkout Log` sheet tab.
2. An automated email dispatch summarises requested item IDs, contact information, and event dates to the designated officers.

### Bulk Requests
* Multi-item allocations utilize the linked standalone PDF form.
* Physical pickups are coordinated at Olympic Crown Storage in Salisbury, NC, followed by formal sign-out with the Quartermaster.

---

## File Structure

```text
├── Code.gs      # Backend logic, sheet parsing, doGet routing, and mail handlers
├── Index.html   # Main UI markup, client scripts, modals, and embedded styles
└── README.md    # Project documentation and deployment setup
