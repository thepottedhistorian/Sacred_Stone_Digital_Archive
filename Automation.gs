/**
 * Automation.gs - 🛡️ Baronial Social Tools
 * Handles automated event processing via the "YES" approval trigger and
 * provides manual administrative tools for emailing groups and submitters.
 * Part of the SCA Webministry Suite - Sacred Stone
 */


function getOfficeEmail() {
  return CONFIG.get("ADMIN_TEST_EMAIL");
}

/**
 * TRIGGER: installedOnEdit
 */
function installedOnEdit(e) {
  if (!e || !e.range) return;

  const range = e.range;
  const sheet = range.getSheet();
  const sheetName = sheet.getName().trim();
  const column = range.getColumn();
  const cellValue = String(e.value).trim();

  if (sheetName === "Baronial Calendar Requests" && column === 1 && cellValue === "YES") {
    processApprovedRow(sheet, range.getRow());
  }
}

/**
 * CORE LOGIC: processApprovedRow
 */
function processApprovedRow(sheet, row) {
  const data = sheet.getRange(row, 1, 1, 20).getValues()[0];
  const officerSig = CONFIG.get("OFFICER_SIGNATURE");
  const groupEmail = CONFIG.get("BARONIAL_GROUP_EMAIL");

  const submitterEmail = data[4];
  const submitterName  = data[5];
  const localGroup     = data[6] ? data[6].toString().trim() : "";
  const eventName      = data[7];
  const rawLocation    = data[12];
  const description    = data[13];
  const eventUrl       = data[14];
  const facebookUrl    = data[15];

  try {
    const startDT = combineDateAndTime(data[8], data[9]);  
    const endDT   = combineDateAndTime(data[10], data[11]); 
    
    if (isNaN(startDT.getTime())) throw new Error("Start Date/Time is invalid.");

    const title = `${eventName} (${localGroup})`;
    
    let locationDisplay = rawLocation;
    if (/\d/.test(rawLocation)) { 
      const mapLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(rawLocation);
      locationDisplay += `\nView on Google Maps: ${mapLink}`;
    }

    const fullDesc = `${description}\n\nEvent Link: ${eventUrl}\nFacebook Link: ${facebookUrl}\n\nSubmitted by: ${submitterName}`;

    // 1. DYNAMIC CALENDAR ROUTING
    const calIds = [];
    const discordCalId = CONFIG.get("DISCORD_CALENDAR_ID");
    if (discordCalId) calIds.push(discordCalId);

    if (localGroup.includes("Charlesbury")) {
      calIds.push(CONFIG.get("CANTON_CC_CALENDAR_ID"));
    } else if (localGroup.includes("Salesberie")) {
      calIds.push(CONFIG.get("CANTON_SG_CALENDAR_ID"));
    } else if (localGroup.includes("Aire Faucon")) {
      calIds.push(CONFIG.get("CANTON_AF_CALENDAR_ID"));
    } else {
      calIds.push(CONFIG.get("BARONIAL_CALENDAR_ID"));
    }

    calIds.forEach(id => {
      if (id) {
        const cal = CalendarApp.getCalendarById(id.trim());
        if (cal) cal.createEvent(title, startDT, endDT, {description: fullDesc, location: rawLocation});
      }
    });

    // 2. GOOGLE GROUP NOTIFICATION
    const groupBody = `Greetings Sacred Stone!\n\nNew Upcoming Event Added!\n\nEvent Name: ${eventName}\n\n` +
                      `Event Date: ${Utilities.formatDate(startDT, TIME_ZONE, "MMMM d, yyyy")}\n\n` +
                      `Location: ${locationDisplay}\n\nYours in Service,\n${officerSig}\nBaronial Webminister`;
    
    GmailApp.sendEmail(groupEmail, `New Upcoming Event: ${eventName}`, groupBody, {
      name: "Sacred Stone Webminister",
      replyTo: submitterEmail,
      cc: OFFICE_EMAIL 
    });

    sheet.getRange(row, 2).setValue("Email Sent — " + new Date().toLocaleString());
    sheet.getRange(row, 1).setBackground("#d9ead3"); 

  } catch (err) {
    console.error(err);
    GmailApp.sendEmail(OFFICE_EMAIL, "🚨 CALENDAR SCRIPT ERROR", err.toString());
    sheet.getRange(row, 1).setBackground("#f4cccc");
  }
}

/**
 * MANUAL MENU FUNCTION: manualPostToGroup
 */
function manualPostToGroup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const row = ss.getActiveCell().getRow();
  if (row < 2) return;

  const ui = SpreadsheetApp.getUi();
  if (ui.alert('Confirm Manual Post', 'Post Row ' + row + ' to the Google Group?', ui.ButtonSet.YES_NO) == ui.Button.YES) {
    try {
      const data = sheet.getRange(row, 1, 1, 20).getValues()[0];
      const startDT = combineDateAndTime(data[8], data[9]);
      
      let locationDisplay = data[12];
      if (/\d/.test(data[12])) {
        const mapLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(data[12]);
        locationDisplay += `\nView on Google Maps: ${mapLink}`;
      }

      const groupBody = `New Upcoming Event!\n\nEvent Name: ${data[7]}\n\n` +
                        `Event Date: ${Utilities.formatDate(startDT, TIME_ZONE, "MMMM d, yyyy")}\n\n` +
                        `Location: ${locationDisplay}\n\nYours in Service,\n${CONFIG.get("OFFICER_SIGNATURE")}\nBaronial Webminister\n${OFFICE_EMAIL}`;
                      
      GmailApp.sendEmail(CONFIG.get("BARONIAL_GROUP_EMAIL"), `New Upcoming Event: ${data[7]}`, groupBody, {
        name: "Sacred Stone Webminister",
        replyTo: data[4],
        cc: OFFICE_EMAIL 
      });
      ui.alert("Success! Sent to Group.");
    } catch (err) { ui.alert("Error: " + err.toString()); }
  }
}

/**
 * MANUAL MENU FUNCTION: manualSendSubmitterNotice
 */
function manualSendSubmitterNotice() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const row = ss.getActiveCell().getRow();
  if (row < 2) return;

  const ui = SpreadsheetApp.getUi();
  if (ui.alert('Confirm Notice', 'Send "Added" notice to submitter on Row ' + row + '?', ui.ButtonSet.YES_NO) == ui.Button.YES) {
    try {
      const data = sheet.getRange(row, 1, 1, 20).getValues()[0];
      const subBody = `Hi ${data[5]},\n\nYour event "${data[7]}" has been added.\n\n--\n${CONFIG.get("OFFICER_SIGNATURE")}\nBaronial Webminister\n${OFFICE_EMAIL}`;
      
      GmailApp.sendEmail(data[4], `Event Added: ${data[7]}`, subBody, {
        name: "Sacred Stone Webminister",
        replyTo: OFFICE_EMAIL,
        bcc: OFFICE_EMAIL
      });
      ui.alert("Success! Sent to Submitter.");
    } catch (err) { ui.alert("Error: " + err.toString()); }
  }
}

/**
 * HELPER: combineDateAndTime
 */
function combineDateAndTime(dateVal, timeVal) {
  let date = new Date(dateVal);
  let hours = 0; let minutes = 0;
  if (timeVal instanceof Date) {
    hours = timeVal.getHours(); minutes = timeVal.getMinutes();
  } else if (timeVal) {
    const match = timeVal.toString().match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (match) {
      hours = parseInt(match[1]); minutes = parseInt(match[2]);
      const ampm = match[3];
      if (ampm && ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
      if (ampm && ampm.toUpperCase() === "AM" && hours === 12) hours = 0;
    }
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0);
}