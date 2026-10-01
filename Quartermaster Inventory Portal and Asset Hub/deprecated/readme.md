# 📦 Pre-v1.5.0 Legacy Controllers

![Status](https://img.shields.io/badge/status-Deprecated-red?style=flat-square)
![Access](https://img.shields.io/badge/archive-Read--Only-lightgrey?style=flat-square)
![Archived](https://img.shields.io/badge/archived-September%202026-c5a880?style=flat-square)

---

## Overview

The scripts housed in this directory contain legacy standalone logic previously used to build and synchronize the Master Inventory workbook. As of **v1.5.0 (September 2026)**, these scripts have been consolidated into a single, unified backend controller:

* **Active Controller:** `Code.gs` (located in the root directory)

---

## Archived Components

### 1. `Master Inventory Builder.gs`
* **Original Function:** Handled structural setup, schema mapping, and sheet formatting for category sheets.
* **Current Status:** Consolidated into `Code.gs`.

### 2. `Master Inventory Sync.gs`
* **Original Function:** Managed background triggers (`onChange`) to re-aggregate individual category sheets into the flattened Master Inventory tab.
* **Current Status:** Consolidated into `Code.gs`.

---

## Usage Notice

> **Do not attach these legacy files to active Google Apps Script deployments.**  
> All active data fetching (`getInventoryData()`), automated checkout logging (`submitCheckoutRequest()`), and double-dispatch email notifications are handled by `Code.gs`. These files are retained solely for historical reference and version auditability within the Sacred Stone Digital Archive.
