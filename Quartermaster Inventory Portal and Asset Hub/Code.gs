/**
 * ==============================================================================
 * PROJECT:     Barony of the Sacred Stone — Quartermaster Portal Backend
 * MODULE:      Master Inventory Synchronizer & Portal Controller (`Code.gs`)
 * PURPOSE:     Consolidates category inventory sheets into "Master Inventory",
 *              handles rich-text/URLs, serves Web App, and logs checkout requests.
 * AUTHOR:      SCA Webministry / Quartermaster Office
 * ==============================================================================
 */

/* ============================================================================
 * SECTION 1 — HTML ENTRYPOINT & ROUTING
 * ============================================================================
 */

/**
 * Serves the primary single-page web app for the Quartermaster Portal.
 * Sets title, responsive viewport, and iframe permissions.
 * 
 * @param {Object} e - Event parameters passed by Google Web App engine.
 * @return {HtmlOutput} Rendered HTML page or error interface.
 */
function doGet(e) {
  try {
    return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Barony of the Sacred Stone — Portal')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    return HtmlService.createHtmlOutput(
      "<h3>Server Error:</h3><p>" + err.toString() + "</p>"
    );
  }
}


/* ============================================================================
 * SECTION 2 — URL & RICH-TEXT EXTRACTION HELPERS
 * ============================================================================
 */

/**
 * Validates whether a given string is formatted as an HTTP/HTTPS or WWW web link.
 * 
 * @param {string} text - Raw text string to validate.
 * @return {boolean} True if string matches URL pattern, false otherwise.
 */
function isLikelyUrl(text) {
  if (!text) return false;
  const t = String(text).trim();
  return /^https?:\/\//i.test(t) || /^www\./i.test(t);
}

/**
 * Parses the target URL out of a `=HYPERLINK("url", "label")` formula string.
 * 
 * @param {string} formula - Raw cell formula string.
 * @return {string} Extracted URL string or empty string.
 */
function extractUrlFromHyperlinkFormula(formula) {
  if (!formula) return "";
  const match = formula.match(/=HYPERLINK\("([^"]+)"/i);
  return match ? match[1] : "";
}

/**
 * Parses the source image URL out of an `=IMAGE("url")` formula string.
 * 
 * @param {string} formula - Raw cell formula string.
 * @return {string} Extracted image source URL string or empty string.
 */
function extractUrlFromImageFormula(formula) {
  if (!formula) return "";
  const match = formula.match(/=IMAGE\("([^"]+)"/i);
  return match ? match[1] : "";
}

/**
 * Evaluates cell inputs to extract a clean URL from Rich-Text, `=HYPERLINK()`, 
 * `=IMAGE()`, or plain text representations.
 * 
 * @param {Object} value - Plain cell value.
 * @param {string} formula - Raw formula string.
 * @param {RichTextValue} richText - Google Apps Script RichTextValue object.
 * @return {string} Extracted valid URL string or empty string.
 */
function getCellUrl(value, formula, richText) {
  try {
    if (richText && typeof richText.getLinkUrl === "function") {
      const rtUrl = richText.getLinkUrl();
      if (rtUrl && isLikelyUrl(rtUrl)) return rtUrl;
    }
  } catch (err) {}

  if (formula && /^=HYPERLINK\(/i.test(formula)) {
    const hUrl = extractUrlFromHyperlinkFormula(formula);
    if (hUrl && isLikelyUrl(hUrl)) return hUrl;
  }

  if (formula && /^=IMAGE\(/i.test(formula)) {
    const iUrl = extractUrlFromImageFormula(formula);
    if (iUrl && isLikelyUrl(iUrl)) return iUrl;
  }

  if (value && isLikelyUrl(value)) {
    return String(value).trim();
  }

  return "";
}

/**
 * Extracts plain text content from rich-text cells, stripping hyperlinked formatting.
 * 
 * @param {Object} value - Plain cell value.
 * @param {RichTextValue} richText - Google Apps Script RichTextValue object.
 * @return {string} Clean plain-text string representation.
 */
function getRichTextOrValue(value, richText) {
  try {
    if (richText && typeof richText.getText === "function") {
      const txt = richText.getText();
      if (txt && txt.trim() !== "") return txt.trim();
    }
  } catch (err) {}

  return value || "";
}


/* ============================================================================
 * SECTION 3 — MASTER INVENTORY SYNCHRONIZER
 * ============================================================================
 */

/**
 * Aggregates data across all ten category tabs into the "Master Inventory" tab.
 * Normalizes rich-text, formula links, photo URLs, and formatting across 18 columns.
 */
function updateMasterInventory() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let masterSheet = ss.getSheetByName("Master Inventory");
  if (!masterSheet) masterSheet = ss.insertSheet("Master Inventory");

  const categorySheetsList = [
    "Regalia",
    "A&S Supplies",
    "Decor",
    "Marshal Items",
    "Tents",
    "Camp Gear",
    "Food Items",
    "Misc Equip",
    "WOW",
    "CooksGuild"
  ];

  const sheetMap = {};
  ss.getSheets().forEach(s => {
    sheetMap[s.getName().trim()] = s;
  });

  let headers = [];
  let allData = [];

  const TOTAL_COLS = 18; // Columns A–R

  categorySheetsList.forEach(sheetName => {
    const sheet = sheetMap[sheetName.trim()];
    if (!sheet) return;

    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return;

    if (headers.length === 0) {
      headers = sheet.getRange(1, 1, 1, TOTAL_COLS).getValues()[0];
    }

    const numDataRows = lastRow - 1;
    const range = sheet.getRange(2, 1, numDataRows, TOTAL_COLS);

    const rawValues = range.getValues();
    const rawFormulas = range.getFormulas();
    const rawRichText = range.getRichTextValues();

    rawValues.forEach((rawRow, r) => {
      const itemId = rawRow[0] ? String(rawRow[0]).trim() : "";
      if (!itemId || itemId === "Item ID") return;

      let row = new Array(TOTAL_COLS).fill("");

      for (let c = 0; c < TOTAL_COLS; c++) {
        const value = rawValues[r][c];
        const formula = rawFormulas[r][c];
        const richText = rawRichText[r][c];

        if (c === 1) {
          // Column B: Item Name
          row[c] = getRichTextOrValue(value, richText);
        }
        else if (c === 14 || c === 15) {
          // Columns O & P: Photo URLs
          row[c] = getCellUrl(value, formula, richText);
        }
        else {
          // Standard Values
          row[c] = value !== undefined && value !== null ? value : "";
        }
      }

      allData.push(row);
    });
  });

  masterSheet.clear();

  if (headers.length > 0) {
    masterSheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    if (allData.length > 0) {
      const targetRange = masterSheet.getRange(2, 1, allData.length, headers.length);
      targetRange.setValues(allData);
      targetRange.setFontColor("#000000");
    }

    masterSheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#1b3b22")
      .setFontColor("#FFFFFF");

    masterSheet.setFrozenRows(1);
  }

  Logger.log("Master Inventory updated. Rows written: " + allData.length);
}


/* ============================================================================
 * SECTION 4 — TRIGGER SETUP
 * ============================================================================
 */

/**
 * Re-initializes project triggers. Removes existing triggers and installs an
 * `onChange` trigger on the active spreadsheet bound to `updateMasterInventory()`.
 */
function setupAutomationTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('updateMasterInventory')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onChange()
    .create();

  Logger.log("Installed onChange trigger for updateMasterInventory().");
}


/* ============================================================================
 * SECTION 5 — WEB APP DATA PROVIDER & CHECKOUT LOGGER
 * ============================================================================
 */

/**
 * Formats standard JavaScript Date objects or text strings into `MM/dd/yyyy`.
 * 
 * @param {Object|string} val - Input date object or string.
 * @param {string} tz - Target timezone identifier (defaults to "GMT").
 * @return {string} Formatted date string.
 */
function formatDateValue(val, tz) {
  if (!val) return "";
  if (val instanceof Date) {
    return Utilities.formatDate(val, tz || "GMT", "MM/dd/yyyy");
  }
  return String(val).trim();
}

/**
 * Retrieves full array of inventory item objects from the "Master Inventory" tab
 * for consumption by the client frontend script.
 * 
 * @return {Array<Object>} Array of inventory item objects.
 */
function getInventoryData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Master Inventory");

    if (!sheet) throw new Error("Master Inventory sheet not found.");

    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return [];

    const tz = ss.getSpreadsheetTimeZone();
    const rows = data.slice(1);

    return rows.map((row, rIdx) => {
      const itemId = row[0] ? String(row[0]).trim() : "ITEM-" + (rIdx + 1);
      const itemName = row[1] ? String(row[1]).trim() : "";
      if (!itemName) return null;

      return {
        itemId: itemId,
        itemName: itemName,
        category: row[2] ? String(row[2]).trim() : "General",
        subCategory: row[3] ? String(row[3]).trim() : "",
        classification: row[4] ? String(row[4]).trim() : "",
        status: row[5] ? String(row[5]).trim() : "Storage",
        totalQty: Number(row[6]) || 1,
        signedOutQty: Number(row[7]) || 0,
        accountedFor: row[8] !== undefined && row[8] !== null ? String(row[8]).trim() : "",
        condition: row[9] ? String(row[9]).trim() : "Good",
        storageLocation: row[10] ? String(row[10]).trim() : "Unassigned Storage",
        signOutDate: formatDateValue(row[11], tz),
        signedOutTo: row[12] ? String(row[12]).trim() : "",
        expectedReturn: formatDateValue(row[13], tz),
        photoUrl: row[14] ? String(row[14]).trim() : "",
        photoUrl2: row[15] ? String(row[15]).trim() : "",
        notes: row[16] ? String(row[16]).trim() : ""
      };
    }).filter(x => x !== null);

  } catch (err) {
    Logger.log("CRITICAL ERROR in getInventoryData: " + err.toString());
    throw new Error(err.toString());
  }
}

/**
 * Processes a checkout request for the Baronial Inventory System.
 * Logs the entry to the 'Checkout Log' sheet, looks up available quantities 
 * from 'Master Inventory', and routes notification emails to relevant officers and requesters.
 * 
 * @param {Object} requestData - Object containing checkout form field values.
 * @return {Object} Response object indicating success status and result message.
 */
function submitCheckoutRequest(requestData) {
  try {
    // ==========================================
    // 1. DATA SANITIZATION & DEFAULT VALUES
    // ==========================================
    const data = requestData || {};
    const itemId = data.itemId || "Unknown ID";
    const scaName = data.scaName || "Unknown Borrower";
    const legalName = data.legalName || "N/A";
    const email = data.email || "";
    const phone = data.phone || "N/A";
    const event = data.event || "N/A";
    const eventDate = data.eventDate || "N/A";
    const quantity = Number(data.quantity) || 1;
    const notes = data.notes || "None";

    // ==========================================
    // 2. SHEET INITIALIZATION & VERIFICATION
    // ==========================================
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let logSheet = ss.getSheetByName('Checkout Log');

    // Auto-create log tab if missing
    if (!logSheet) {
      logSheet = ss.insertSheet('Checkout Log');
      logSheet.appendRow([
        "Timestamp", "SCA Name", "Legal Name", "Email", 
        "Sponsoring Group", "Event/Purpose", "Item ID", "Item Name", "Quantity", 
        "Pickup Date", "Expected Return", "Status"
      ]);
    }

    // ==========================================
    // 3. MASTER INVENTORY LOOKUP
    // ==========================================
    const masterSheet = ss.getSheetByName("Master Inventory");
    let itemName = itemId;
    let availableQty = "Unknown";

    if (masterSheet) {
      const sheetData = masterSheet.getDataRange().getValues();
      // Iterate through records (skipping header row)
      for (let i = 1; i < sheetData.length; i++) {
        if (String(sheetData[i][0]).trim() === String(itemId).trim()) {
          itemName = sheetData[i][1] ? String(sheetData[i][1]).trim() : itemId;
          const total = Number(sheetData[i][6]) || 1;
          const signedOut = Number(sheetData[i][7]) || 0;
          availableQty = Math.max(0, total - signedOut);
          break;
        }
      }
    }

    // ==========================================
    // 4. LOG ENTRY CREATION
    // ==========================================
    const sheetId = ss.getId();
    const logSheetId = logSheet.getSheetId();
    const logTabUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${logSheetId}`;

    logSheet.appendRow([
      new Date(),
      scaName,
      legalName,
      email,
      "N/A",
      event,
      itemId,
      itemName,
      quantity,
      eventDate,
      "N/A",
      "Pending Approval"
    ]);

    // ==========================================
    // 5. OFFICER NOTIFICATION EMAIL
    // ==========================================
    const quartermasterEmail = "quartermaster@sacredstone.atlantia.sca.org";
    const exchequerEmail = "exchequer@sacredstone.atlantia.sca.org";
    const webministerEmail = "webminister@sacredstone.atlantia.sca.org";

    const subject = `[Quartermaster Request] ${itemId} (${itemName}) — ${scaName}`;

    const qmBody = 
      `Greetings Officers,\n\n` +
      `A new baronial inventory checkout request has been submitted:\n\n` +
      `• Item ID & Name: ${itemId} — ${itemName}\n` +
      `• Available in Storage at Request: ${availableQty} unit(s)\n` +
      `• Requested Quantity: ${quantity}\n` +
      `• SCA Name: ${scaName}\n` +
      `• Legal Name: ${legalName}\n` +
      `• Contact Email: ${email}\n` +
      `• Phone: ${phone}\n` +
      `• Event / Location: ${event}\n` +
      `• Date of Event: ${eventDate}\n` +
      `• Special Notes: ${notes}\n\n` +
      `Policy Confirmations:\n` +
      `[ ✔ ] Confirmed reading Baronial Policies: https://sacredstone.atlantia.sca.org/baronial-policy/\n` +
      `[ ✔ ] Confirmed reading Kingdom Exchequer / Branch Policies: https://exchequer.atlantia.sca.org/branchpolicy.php\n\n` +
      `View Checkout Log: ${logTabUrl}\n\n` +
      `Please review and process this request.\n\n` +
      `In Service,\n` +
      `Barony of the Sacred Stone Quartermaster System`;

    MailApp.sendEmail({
      to: `${quartermasterEmail}, ${exchequerEmail}`,
      cc: webministerEmail,
      subject: subject,
      body: qmBody
    });

    // ==========================================
    // 6. REQUESTER CONFIRMATION EMAIL
    // ==========================================
    if (email) {
      const requesterBody = 
        `Unto ${scaName},\n\n` +
        `Thank you for submitting a checkout request for Baronial inventory item ${itemId} — ${itemName} (Qty: ${quantity}).\n\n` +
        `Request Details:\n` +
        `• Event/Purpose: ${event}\n` +
        `• Requested Date: ${eventDate}\n` +
        `• Status: Pending Quartermaster & Exchequer Approval\n\n` +
        `Policy Acknowledgements:\n` +
        `• Baronial Policies: https://sacredstone.atlantia.sca.org/baronial-policy/\n` +
        `• Branch Financial Policies: https://exchequer.atlantia.sca.org/branchpolicy.php\n\n` +
        `Your request has been logged and routed to the Baronial officers for review.\n\n` +
        `In Service,\n` +
        `Barony of the Sacred Stone Quartermaster Office`;

      MailApp.sendEmail({
        to: email,
        subject: `Confirmation: Baronial Inventory Request (${itemId})`,
        body: requesterBody
      });
    }

    return { 
      success: true, 
      message: "Checkout request logged successfully. Confirmation emails sent." 
    };

  } catch (err) {
    Logger.log("Error in submitCheckoutRequest: " + err.toString());
    throw new Error("Failed to submit request: " + err.message);
  }
}
