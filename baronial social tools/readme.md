# 📋 Baronial Social Tools — Technical Architecture & Release History

[![Project](https://img.shields.io/badge/Project-Baronial%20Social%20Tools-8A2BE2?style=flat-square)](https://github.com/thepottedhistorian/Sacred_Stone_Digital_Archive)
[![Version](https://img.shields.io/badge/Version-1.3.0-blue.svg?style=flat-square)](https://github.com/thepottedhistorian/Sacred_Stone_Digital_Archive/tree/main/baronial%20social%20tools)
[![Runtime](https://img.shields.io/badge/Runtime-Google%20Apps%20Script%20(V8)-4285F4?style=flat-square&logo=google)](https://developers.google.com/apps-script)
[![Integrations](https://img.shields.io/badge/Integrations-Discord%20%7C%20WordPress%20%7C%20Google%20Workspace-2EA44F?style=flat-square)](https://github.com/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](https://www.apache.org/licenses/LICENSE-2.0)
[![Maintenance](https://img.shields.io/badge/Maintained%20by-Baronial%20Webministry-emerald.svg?style=flat-square)](https://sacredstone.atlantia.sca.org/)

**Maintainer & Developer:** Ailís inghean Uí Riagáin (Rebecca Short)  
**Parent Archive:** [Sacred Stone Digital Archive](https://github.com/thepottedhistorian/Sacred_Stone_Digital_Archive)  
**Affiliation:** SCA Barony of the Sacred Stone | Kingdom of Atlantia  

---

## 🧭 System Purpose & Core Mission
The **Baronial Social Tools** suite is an automated event-dispatching and communications platform designed for the **Barony of the Sacred Stone**. Built entirely within Google Apps Script (V8) and integrated with Google Workspace, this system replaces manual data re-entry across baronial calendars, email distribution lists, Discord servers, and WordPress web portals.

### The Operational Challenge
Baronial events, fighter practices, guild workshops, and business meetings originate from submissions submitted by autocrats and branch officers through a standardized Google Form. Previously, publishing a single activity required manually creating calendar entries, formatting separate officer announcement emails, crafting Discord community announcements, and drafting weekly digest articles for the website.

### The Solution: One-Action Multi-Channel Dispatch
The suite binds the Google Form intake spreadsheet into an automated operations hub:
1. **Approval Verification:** When an authorized officer reviews a row in the Master Event Intake Sheet and types `YES` into Column A, the event processor triggers automatically.
2. **Calendar Provisioning:** The event is validated, formatted, and inserted into the appropriate Baronial or Canton Google Calendar with structured location and virtual meeting URLs.
3. **Automated Notification:** Targeted confirmation emails are dispatched to the event submitter while summary notifications are routed to officer group lists.
4. **Discord Webhook Broadcast:** A rich embed is assembled with custom heraldic styling, timestamps, and direct map/meeting links, then sent to designated Discord guild channels.
5. **Periodic Digest Publishing:** A weekly automated engine aggregates all active events into formatted HTML digests for publication on the official WordPress website.

---

## 🛠️ Script Roster & Detailed Functional Breakdown

```text
baronial social tools/
├── Automation.gs         # Core onEdit event dispatcher & approval execution pipeline
├── ChangeLog.gs          # In-engine ledger of version changes & hotfixes
├── Digest.gs             # String cleanup, regex parsers & text extractors
├── DigestAutomation.gs   # Scheduled digest generation & mailing distribution
├── DigestModal.html      # Responsive HTML/CSS staging modal for WordPress
├── Discord.gs            # Discord API executor, webhook client & rate-limiting
├── DiscordPreview.html   # Rich embed preview component
├── KingdomTools.gs       # Atlantian calendar tools & external feed scrapers
├── Main.gs               # Master router, menu setup & calId handlers
├── OnlineSync.gs         # Virtual event aggregator & description normalizer
├── README.gs             # Embedded developer documentation & script guide
├── UniversalPreview.html # Cross-platform preview suite (Web, Chat, Email)
├── Z_patches.gs          # Data migration routines & hotfix patches
├── appsscript.json       # Manifest, OAuth whitelist & Chrome V8 flag
├── gitignore.md          # Module-level ignore rules
└── readme.md             # Project overview & operational documentation
```

### 1. Core Workflow & Intake Automation

#### `Automation.gs` — Event Processing & Approval Engine
- **Purpose:** Acts as the primary operational trigger when rows in the intake sheet are verified by the Webministry or Chronicler.
- **Key Responsibilities:**
  - Listens for `onEdit` events on the intake spreadsheet, checking specifically for the approval trigger (`YES` in Column A).
  - Validates date strings, start/end times, physical street addresses, and virtual conference links (Zoom, Google Meet, Discord Stage).
  - Handles batch processing of multiple queued approvals without hitting Apps Script execution limits.
  - Flags processed rows with timestamped status codes to prevent duplicate submissions or loop triggers.

#### `Main.gs` — Routing & Administration
- **Purpose:** Provides administrative menus inside the Google Sheets interface and routes global operational parameters.
- **Key Responsibilities:**
  - Injects custom menu items into the Google Sheets UI (`👑 Baronial Admin` -> *Sync Calendars*, *Generate Digest*, *Test Discord Hooks*).
  - Resolves calendar IDs dynamically based on Canton or Barony selection.
  - Provides backward-compatible wrapper functions to support legacy manual triggers without breaking automation hooks.

### 2. Digest & Web Publishing Engine

#### `Digest.gs` — Text Parsing & Regex Extraction
- **Purpose:** Sanitizes raw, user-submitted event descriptions into structured editorial summaries.
- **Key Responsibilities:**
  - Utilizes specialized regular expressions to isolate URLs, officer titles, and physical coordinates from unstructured text blocks.
  - Normalizes irregular date and time formatting into consistent heraldic publication standards.
  - Strips unwanted carriage returns, broken HTML entities, and formatting artifacts.

#### `DigestAutomation.gs` — Scheduled Weekly Digest Engine
- **Purpose:** Compiles upcoming calendar events into weekly administrative digests.
- **Key Responsibilities:**
  - Triggered automatically every Monday at 10:00 AM EST via time-driven Apps Script triggers.
  - Queries Google Calendar for all events scheduled over a rolling 14-day window.
  - Assembles structured HTML emails sent to official baronial and regional populace mailing lists.

#### `DigestModal.html` — WordPress Publishing Interface
- **Purpose:** An interactive, responsive sidebar and dialog window deployed within Google Sheets.
- **Key Responsibilities:**
  - Allows an officer to review, reorder, and tweak upcoming event summaries before pushing live.
  - Features a direct publishing integration that pushes formatted digest copy directly to the baronial WordPress site as a scheduled post draft via the WordPress REST API.

### 3. Community Broadcasting & Messaging

#### `Discord.gs` — Discord Webhook Client
- **Purpose:** Manages automated communication between Google Workspace and the Baronial Discord server.
- **Key Responsibilities:**
  - Constructs multi-field JSON payloads compliant with the Discord Webhook API.
  - Formats rich embeds with baronial branding colors (Azure `#002B49` and Gold `#FFD700`), timestamps, event hosts, and Google Maps links.
  - Incorporates exponential backoff and HTTP status code inspection to gracefully manage Discord rate limits (HTTP 429).

#### `DiscordPreview.html` — Embed Sandbox
- **Purpose:** A client-side preview pane mimicking Discord's dark-mode UI.
- **Key Responsibilities:**
  - Renders live previews of Discord embed cards directly inside Google Sheets before webhook transmission.
  - Validates character limits (title, field, and description bounds) to prevent silent API rejections.

#### `UniversalPreview.html` — Cross-Platform Staging Suite
- **Purpose:** Multi-channel layout review interface.
- **Key Responsibilities:**
  - Displays side-by-side previews of how a scheduled event will appear in an email notification, on the WordPress blog, and in Discord chat.
  - Allows officers to catch truncation or broken hyperlinks before broadcasting across all channels.

### 4. Regional & Virtual Ingestion

#### `OnlineSync.gs` — Virtual Activity Synchronization
- **Purpose:** Bridges regional online activities into the local calendar environment.
- **Key Responsibilities:**
  - Scrapes and parses listings from the SCA Unofficial Online Activities feeds.
  - Identifies events hosted within or relevant to the Barony of the Sacred Stone, eliminating duplications while preserving access links.

#### `KingdomTools.gs` — Atlantian Kingdom Calendar Sync
- **Purpose:** Integrates with the broader Kingdom of Atlantia web infrastructure.
- **Key Responsibilities:**
  - Ingests Kingdom-level ICS calendar feeds to track major Kingdom events (e.g., Crown Tourneys, Coronets, Pennsic, Gulf Wars).
  - Flags scheduling conflicts where local baronial practices overlap with regional Royal events.

### 5. Utilities & Schema Maintenance

#### `Z_patches.gs` — Migration & Patch Utilities
- **Purpose:** Safe hotfix script for ongoing maintenance.
- **Key Responsibilities:**
  - Contains database schema migration routines to backfill new columns on historical spreadsheet rows.
  - Provides cleanup scripts to find, unbind, and delete orphaned triggers or corrupt calendar listeners.

#### `README.gs` & `ChangeLog.gs`
- **Purpose:** In-IDE developer documentation.
- **Key Responsibilities:**
  - Serves as internal reference manuals directly inside the Google Apps Script code editor, ensuring future Webministers can understand setup parameters without navigating external repositories.

---

## 🔄 End-to-End Operational Workflows

### Workflow 1: Event Listing Approval & Instant Broadcast
```text
[ Submitter Google Form ]
          │
          ▼
[ Master Spreadsheet Row Added ]
          │
          ▼ (Officer Enters "YES" in Column A)
[ Automation.gs onEdit Trigger ]
          │
   ┌──────┴──────────────────────┬────────────────────────┐
   ▼                             ▼                        ▼
[ Google Calendar API ]    [ Gmail Dispatch ]     [ Discord Webhook ]
- Create Calendar Event    - Submitter Notice     - Construct Embed
- Insert Location/Zoom     - Officer Alert        - Post to Guild
```

### Workflow 2: Weekly Digest & WordPress Publishing
```text
[ Time Trigger: Mon 10:00 AM ] ──> [ DigestAutomation.gs ]
                                            │
                                            ▼
                           [ Ingest Next 14 Days Events ]
                                            │
                                            ▼
                           [ Clean Text via Digest.gs ]
                                            │
                                            ▼
                           [ Launch DigestModal.html ]
                                            │
                           ┌────────────────┴───────────────┐
                           ▼                                ▼
                 [ Send Populace Email ]         [ Post to WordPress API ]
```

---

## ⚙️ Security & Script Properties Setup

All secret tokens, sensitive IDs, and endpoints are isolated from the codebase using `PropertiesService.getScriptProperties()`. To deploy this suite, configure the following keys in the Apps Script project settings:

```javascript
function setSystemProperties() {
  PropertiesService.getScriptProperties().setProperties({
    'BARONY_CALENDAR_ID': 'BARONY_CALENDAR_ID',
    'CANTON_CC_CALENDAR_ID': 'CANTON_CC_CALENDAR_ID',
    'CANTON_SG_CALENDAR_ID': 'CANTON_SG_CALENDAR_ID',
    'CANTON_AF_CALENDAR_ID': 'CANTON_AF_CALENDAR_ID',
    'DISCORD_WEBHOOK_URL': '[https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN](https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN)',
    'WP_API_ENDPOINT': '[https://your-domain.org/wp-json/wp/v2/posts](https://your-domain.org/wp-json/wp/v2/posts)',
    'WP_AUTH_TOKEN': 'Basic YOUR_BASE64_AUTH_APPLICATION_PASSWORD',
    'OFFICER_GROUP_EMAIL': 'YOUR_OFFICER_GROUP_EMAIL'
  });
}
```

---

## 📜 Detailed Release Ledger

### [1.3.0] — 2026-09-14
#### 🌐 CMS Integration & UI Enhancement
- **WordPress Integration:** Enhanced `DigestModal.html` with direct publication hooks to compile and dispatch event digests straight to the WordPress REST API endpoint.
- **Universal Staging Suite:** Added `UniversalPreview.html` to provide a consolidated preview modal evaluating message layout across email clients, web browsers, and Discord markdown before sending.
- **Regex & String Refactoring:** Completely refactored pattern-matching logic in `Digest.gs` for cleaner parsing of irregular multi-line calendar descriptions and virtual meeting URLs.
- **Hotfix Layer:** Established `Z_patches.gs` for hotfixes, non-destructive legacy schema migration, and orphaned trigger cleanup.

---

### [1.2.0] — 2026-06-05
#### ⚙️ Security & Configuration
- **Zero-Footprint Credential Isolation:** Migrated all hardcoded identifiers (Calendar IDs, Webhook URLs, and Group Emails) out of the active spreadsheet and into secure **Google Apps Script Properties** (`PropertiesService.getScriptProperties()`).
- **Canton Multi-Calendar Support:** Added multi-key configuration support for regional canton calendars (`CANTON_CC_CALENDAR_ID`, `CANTON_SG_CALENDAR_ID`, `CANTON_AF_CALENDAR_ID`).

#### 🚀 Features & Interface
- **Staging Modals:** Rolled out streamlined HTML staging modals (`DigestModal.html` & `DiscordPreview.html`) for previewing digests and webhook embeds before firing messages live.
- **Discord Client Hardening:** Standardized multi-stage Discord webhook delivery with built-in exponential backoff and rate-limit handling (`Discord.gs`).

---

## [1.1.0] — 2026-05-18
### 🌐 Integrations & Data Ingestion
- **Virtual Event Aggregation:** Integrated `OnlineSync.gs` to automatically harvest, parse, and normalize event listings directly from the SCA Unofficial Online Activities calendar.
- **Kingdom Feed Alignment:** Added `KingdomTools.gs` to support external Kingdom of Atlantia ICS calendar data scraping and timezone alignment.

---

## [1.0.0] — 2026-05-01
### 🎉 Initial Release
- **Initial Framework Deployment:** Initial release of the automated Baronial Social Tools architecture.
- **Calendar Dispatcher:** Established automated Google Calendar synchronization and form-response processing via `Automation.gs` and `Main.gs`.
- **Scheduled Digest Runs:** Configured automated time-driven triggers for Monday 10:00 AM EST runs (`DigestAutomation.gs`) for baronial email compilation and delivery.

---

## ⚖️ License & Attribution

```text
Copyright (c) 2026 Rebecca Short (Ailís inghean Uí Riagáin) / Barony of the Sacred Stone
```

This repository contains both automation software and operational documentation. Assets are governed to support open collaboration and technical adoption across SCA branches while protecting original authorship and institutional attribution:

---

### 1. Code Assets (Apache License 2.0)
All Google Apps Script backend files (`.gs`), HTML/CSS modals (`.html`), JSON manifests (`appsscript.json`), and client-side automation logic are licensed under the **[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)**.

#### Required Attribution & Compliance Guidelines
If you fork, mirror, adapt, or deploy this code for another Barony, Canton, Shire, or Kingdom office, you must satisfy the following terms:
- **Preserve File Headers:** You must retain the original copyright notice, author attribution, and disclaimer blocks at the top of all source script files (`Automation.gs`, `Discord.gs`, `DigestAutomation.gs`, etc.).
- **State Modifications:** Any files modified, altered, or refactored must carry prominent notices and timestamps stating that the files were changed and describing the alterations made.
- **Include License Text:** Any redistribution must include a copy of the Apache 2.0 license or a direct link to the full legal text (`https://www.apache.org/licenses/LICENSE-2.0`).
- **Standard Attribution Notice:** Include credit in your repository `README.md`, script headers, or application UI:
  > *"Based on Baronial Social Tools originally developed by Ailís inghean Uí Riagáin (Rebecca Short) for the Barony of the Sacred Stone Webministry (Kingdom of Atlantia)."*

---

### 2. Documentation & Written Assets (CC BY-NC 4.0)
All operational guides, installation walkthroughs, changelog ledgers, markdown manuals, and setup documentation are licensed under the **[Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**.

- **Attribution:** When republishing, adapting, or excerpting training materials, manuals, or workflow diagrams, you must give appropriate credit to **Rebecca Short (Ailís inghean Uí Riagáin)**, provide a link to the license, and indicate if changes were made.
- **Non-Commercial:** Documentation, manuals, and instructional text may not be used, republished, or bundled for commercial or fee-based training purposes.

---

### 3. Heraldic & Institutional Branding Notice
Heraldic artwork, registered armorial devices, badges, ensigns, official officer titles, and branch names associated with the **Barony of the Sacred Stone**, the **Kingdom of Atlantia**, or the **Society for Creative Anachronism, Inc.** remain the exclusive property of their respective owners. 

These elements are utilized within this repository strictly for official educational, historical, and baronial administrative operations, and are excluded from open-source software licensing grants.
