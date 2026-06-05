/**
 * KingdomTools.gs — 👑 ICS-Only Event Engine
 * Handles synchronization with the Kingdom calendar feed.
 * Part of the SCA Webministry Suite - Sacred Stone
 */

/**
 * CONFIGURATION HELPER
 */
const CONFIG = {
  get(key) {
    const value = PropertiesService.getScriptProperties().getProperty(key);
    if (!value) console.warn(`Missing Property: ${key}`);
    return value || "";
  }
};

// SANITIZED: Moved URL to Script Properties
const ICS_URL = CONFIG.get("KINGDOM_ICS_URL");

/************************************************************
 * getICSEvents(startDate, endDate)
 ************************************************************/
function getICSEvents(startDate, endDate) {
  if (!ICS_URL) {
    console.error("KINGDOM_ICS_URL property not set.");
    return [];
  }
  
  const response = UrlFetchApp.fetch(ICS_URL);
  const ics = response.getContentText();
  const events = parseICS(ics);

  return events.filter(function(ev) {
    return ev.start >= startDate && ev.start <= endDate;
  });
}

/************************************************************
 * parseICS(icsText)
 ************************************************************/
function parseICS(icsText) {
  const lines = icsText.split(/\r?\n/);
  const events = [];
  let current = null;

  lines.forEach(function(line) {
    if (line === "BEGIN:VEVENT") {
      current = {};
    } else if (line === "END:VEVENT") {
      if (current) events.push(current);
      current = null;
    } else if (current) {
      if (line.startsWith("SUMMARY:")) {
        current.title = line.replace("SUMMARY:", "").trim();
      } else if (line.startsWith("LOCATION:")) {
        current.location = line.replace("LOCATION:", "").trim();
      } else if (line.startsWith("URL:")) {
        current.url = line.replace("URL:", "").trim();
      } else if (line.startsWith("DESCRIPTION:")) {
        current.description = line.replace("DESCRIPTION:", "").trim();
      } else if (line.startsWith("DTSTART")) {
        current.start = parseICSDate(line);
      } else if (line.startsWith("DTEND")) {
        current.end = parseICSDate(line);
      }
    }
  });
  return events;
}

/************************************************************
 * parseICSDate(line)
 ************************************************************/
function parseICSDate(line) {
  const parts = line.split(":");
  if (parts.length < 2) return new Date();
  const date = parts[1];
  const year = parseInt(date.substring(0, 4), 10);
  const month = parseInt(date.substring(4, 6), 10) - 1;
  const day = parseInt(date.substring(6, 8), 10);
  return new Date(year, month, day);
}

/************************************************************
 * formatICSEvent(ev)
 ************************************************************/
function formatICSEvent(ev) {
  const start = ev.start;
  const end = ev.end || new Date(start.getTime() + 86400000);
  const dateStr = formatDateRange(start, end);

  return (
    "📌 " + ev.title + "\n" +
    "📅 " + dateStr + "\n" +
    "Time: All Day\n" +
    "Location: " + (ev.location || "Location not specified") + "\n" +
    "Event Flyer: " + (ev.url || "None")
  );
}

function formatDateRange(start, end) {
  const opts = { month: "long", day: "numeric" };
  const s = start.toLocaleDateString("en-US", opts);
  const e = end.toLocaleDateString("en-US", opts);
  return (s === e) ? s : s + " — " + e;
}

/************************************************************
 * TEST FUNCTION — testICSEvent() 
 * (Retained as requested)
 ************************************************************/
function testICSEvent() {
  if (!ICS_URL) {
    SpreadsheetApp.getUi().alert("Error: KINGDOM_ICS_URL property not set.");
    return;
  }
  const ics = UrlFetchApp.fetch(ICS_URL).getContentText();
  const events = parseICS(ics);

  if (!events.length) {
    SpreadsheetApp.getUi().alert("No events found in ICS.");
    return;
  }

  const sample = events[0];
  const block = formatICSEvent(sample);

  Logger.log(block);
  SpreadsheetApp.getUi().alert("Test event logged. Check Logs.");
}

function refreshICSNow() {
  UrlFetchApp.fetch(ICS_URL);
  SpreadsheetApp.getUi().alert("ICS feed refreshed.");
}