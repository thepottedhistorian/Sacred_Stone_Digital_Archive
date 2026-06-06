/**
 * digest_automation.gs - 🛡️ Baronial Social Tools
 * Governs the weekly renewal of the OnlineData sheet.
 * Part of the SCA Webministry Suite - Sacred Stone
 */



/* ============================================================
   SECTION I: autoRefreshOnlineDigestData
   ------------------------------------------------------------
   Purpose:
     Serves as the primary weekly automation function. It wipes
     the OnlineData sheet and repopulates it with a fresh
     fourteen day window of online activities.
   ------------------------------------------------------------ */

function autoRefreshOnlineDigestData() {
  console.log("Starting Weekly Online Digest Refresh...");

  // Step 1: Clear the OnlineData sheet
  wipeOnlineSheet();

  // Step 2: Fetch and repopulate the sheet
  fetchOnlineEventsToSheet();

  console.log("Baronial Online Digest Refresh Complete.");
}

/* ============================================================
   SECTION II: setupWeeklyDigestTrigger
   ------------------------------------------------------------
   Purpose:
     Establishes a weekly time based trigger that runs the
     autoRefreshOnlineDigestData function every Monday morning.
   ------------------------------------------------------------ */

function setupWeeklyDigestTrigger() {
  // Step 1: Remove older triggers for this function
  const allTriggers = ScriptApp.getProjectTriggers();

  for (var i = 0; i < allTriggers.length; i++) {
    if (allTriggers[i].getHandlerFunction() === "autoRefreshOnlineDigestData") {
      ScriptApp.deleteTrigger(allTriggers[i]);
    }
  }

  // Step 2: Create the new weekly trigger
  ScriptApp.newTrigger("autoRefreshOnlineDigestData")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(10)
    .nearMinute(0)
    .create();

  SpreadsheetApp.getUi().alert(
    "The OnlineData tab will now refresh every Monday at 10:00 AM."
  );
}
