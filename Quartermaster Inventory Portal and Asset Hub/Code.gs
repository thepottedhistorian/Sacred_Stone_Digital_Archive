/**
 * ==============================================================================
 * PROJECT:     Barony of the Sacred Stone — Quartermaster Portal Backend
 * MODULE:      Master Inventory Synchronizer & Portal Controller (`Code.gs`)
 * PURPOSE:     Consolidates category inventory sheets into "Master Inventory",
 *              handles rich-text/URLs, serves Web App, and logs checkout requests.
 * ==============================================================================
 */

// force auth update
/* ============================================================================
 * SECTION 1 — HTML ENTRYPOINT & ROUTING
 * ============================================================================
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

function isLikelyUrl(text) {
  if (!text) return false;
  const t = String(text).trim();
  return /^https?:\/\//i.test(t) || /^www\./i.test(t);
}

function extractUrlFromHyperlinkFormula(formula) {
  if (!formula) return "";
  const match = formula.match(/=HYPERLINK\("([^"]+)"/i);
  return match ? match[1] : "";
}

function extractUrlFromImageFormula(formula) {
  if (!formula) return "";
  const match = formula.match(/=IMAGE\("([^"]+)"/i);
  return match ? match[1] : "";
}

/**
 * Extracts URL from Rich-Text, HYPERLINK(), IMAGE(), or plain text.
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
 * Extracts TEXT from rich-text Item Name cells.
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
          row[c] = getRichTextOrValue(value, richText);
        }
        else if (c === 14 || c === 15) {
          row[c] = getCellUrl(value, formula, richText);
        }
        else {
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

function formatDateValue(val, tz) {
  if (!val) return "";
  if (val instanceof Date) {
    return Utilities.formatDate(val, tz || "GMT", "MM/dd/yyyy");
  }
  return String(val).trim();
}

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
 * Handles incoming checkout form submissions from Index.html.
 */
function submitCheckoutRequest(requestData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let logSheet = ss.getSheetByName('Checkout Log');
    
    if (!logSheet) {
      logSheet = ss.insertSheet('Checkout Log');
      logSheet.appendRow([
        "Timestamp", "SCA Name", "Legal Name", "Email", 
        "Sponsoring Group", "Event/Purpose", "Item ID", "Item Name", "Quantity", 
        "Pickup Date", "Expected Return", "Status"
      ]);
    }

    // Look up Master Inventory to get Item Name and Available Quantity at time of request
    const masterSheet = ss.getSheetByName("Master Inventory");
    let itemName = requestData.itemId;
    let availableQty = "Unknown";
    
    if (masterSheet) {
      const data = masterSheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]).trim() === String(requestData.itemId).trim()) {
          itemName = data[i][1] ? String(data[i][1]).trim() : requestData.itemId;
          const total = Number(data[i][6]) || 1;
          const signedOut = Number(data[i][7]) || 0;
          availableQty = Math.max(0, total - signedOut);
          break;
        }
      }
    }

    // Get URL of the Checkout Log tab
    const sheetId = ss.getId();
    const logSheetId = logSheet.getSheetId();
    const logTabUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${logSheetId}`;

    logSheet.appendRow([
      new Date(),
      requestData.scaName,
      requestData.legalName,
      requestData.email,
      "N/A",
      requestData.event,
      requestData.itemId,
      itemName,
      requestData.quantity || 1,
      requestData.eventDate,
      "N/A",
      "Pending Approval"
    ]);

    const quartermasterEmail = "quartermaster@sacredstone.atlantia.sca.org";
    const exchequerEmail = "exchequer@sacredstone.atlantia.sca.org";
    const webministerEmail = "webminister@sacredstone.atlantia.sca.org";

    const subject = `[Quartermaster Request] ${requestData.itemId} (${itemName}) — ${requestData.scaName}`;

    const qmBody = 
      `Greetings Officers,\n\n` +
      `A new baronial inventory checkout request has been submitted:\n\n` +
      `• Item ID & Name: ${requestData.itemId} — ${itemName}\n` +
      `• Available in Storage at Request: ${availableQty} unit(s)\n` +
      `• Requested Quantity: ${requestData.quantity}\n` +
      `• SCA Name: ${requestData.scaName}\n` +
      `• Legal Name: ${requestData.legalName}\n` +
      `• Contact Email: ${requestData.email}\n` +
      `• Phone: ${requestData.phone}\n` +
      `• Event / Location: ${requestData.event}\n` +
      `• Date of Event: ${requestData.eventDate}\n` +
      `• Special Notes: ${requestData.notes}\n\n` +
      `Policy Confirmations:\n` +
      `[ ✔ ] Confirmed reading Baronial Policies: https://sacredstone.atlantia.sca.org/baronial-policy/\n` +
      `[ ✔ ] Confirmed reading Kingdom Exchequer / Branch Policies: https://exchequer.atlantia.sca.org/branchpolicy.php#SacredStone\n\n` +
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

    if (requestData.email) {
      const requesterBody = 
        `Unto ${requestData.scaName},\n\n` +
        `Thank you for submitting a checkout request for Baronial inventory item ${requestData.itemId} — ${itemName} (Qty: ${requestData.quantity}).\n\n` +
        `Request Details:\n` +
        `• Event/Purpose: ${requestData.event}\n` +
        `• Requested Date: ${requestData.eventDate}\n` +
        `• Status: Pending Quartermaster & Exchequer Approval\n\n` +
        `Policy Acknowledgements:\n` +
        `• Baronial Policies: https://sacredstone.atlantia.sca.org/baronial-policy/\n` +
        `• Branch Financial Policies: https://exchequer.atlantia.sca.org/branchpolicy.php#SacredStone\n\n` +
        `Your request has been logged and routed to the Baronial officers for review.\n\n` +
        `In Service,\n` +
        `Barony of the Sacred Stone Quartermaster Office`;

      MailApp.sendEmail({
        to: requestData.email,
        subject: `Confirmation: Baronial Inventory Request (${requestData.itemId})`,
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
