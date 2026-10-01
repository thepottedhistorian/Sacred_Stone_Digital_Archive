/**
 * ==============================================================================
 * PROJECT:     Barony of the Sacred Stone — Category-Level Photo Linker
 * MODULE:      Automation Utility (`ImageLinker.gs`)
 * PURPOSE:     Scans the Google Drive photo repository and maps primary and 
 *              secondary images directly into each individual category sheet 
 *              (Columns O & P) based on the Item Name.
 * ==============================================================================
 */

function linkCategorySheetPhotos() {
  const ss = SpreadsheetApp.openById(getSpreadsheetId_());
  
  // List of category sheets to update
  const categorySheetsList = [
    "Regalia", "A&S Supplies", "Decor", "Marshal Items", "Tents", 
    "Camp Gear", "Food Items", "Misc Equip", "WOW", "CooksGuild"
  ];
  
  // Map of workbook sheets
  const allSheets = ss.getSheets();
  const sheetMap = {};
  allSheets.forEach(s => {
    sheetMap[s.getName().trim().toLowerCase()] = s;
  });

  // 1. Locate Google Drive Folder
  const parentFolderName = "Baronial Quartermaster Inventory Photos";
  const parentFolders = DriveApp.getFoldersByName(parentFolderName);
  
  if (!parentFolders.hasNext()) {
    if (SpreadsheetApp.getUi()) {
      SpreadsheetApp.getUi().alert("Error: Could not find Google Drive folder '" + parentFolderName + "'.");
    }
    return;
  }
  
  const parentFolder = parentFolders.next();
  const globalFileMap = {};
  let totalFilesInDrive = 0;

  // Helper function to index files
  function indexFiles(files) {
    while (files.hasNext()) {
      let file = files.next();
      let fileName = file.getName().replace(/\.[^/.]+$/, "").toLowerCase().trim();
      // Store web-viewable image URL using File ID
      globalFileMap[fileName] = "https://drive.google.com/uc?id=" + file.getId();
      totalFilesInDrive++;
    }
  }

  // Scan root folder files
  indexFiles(parentFolder.getFiles());

  // Scan subfolder files
  const subFolders = parentFolder.getFolders();
  while (subFolders.hasNext()) {
    indexFiles(subFolders.next().getFiles());
  }

  let totalPrimaryLinked = 0;
  let totalSecondaryLinked = 0;

  // 2. Process each category sheet in bulk
  categorySheetsList.forEach((sheetName) => {
    const sheet = sheetMap[sheetName.trim().toLowerCase()];
    if (!sheet) return;

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return; // Skip empty tabs

    // Fetch Item IDs (Col A) and Item Names (Col B)
    const nameRange = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
    
    // Prepare arrays for batch updates of Col O (15) & Col P (16)
    const primaryCol = [];
    const secondaryCol = [];

    for (let r = 0; r < nameRange.length; r++) {
      let itemId = nameRange[r][0] ? String(nameRange[r][0]).trim() : "";
      let itemName = nameRange[r][1] ? String(nameRange[r][1]).trim().toLowerCase() : "";

      let primaryUrl = "";
      let secondaryUrl = "";

      if (itemId !== "" && itemName !== "") {
        if (globalFileMap[itemName]) {
          primaryUrl = globalFileMap[itemName];
          totalPrimaryLinked++;
        }

        let secondaryKey = itemName + " - 2";
        if (globalFileMap[secondaryKey]) {
          secondaryUrl = globalFileMap[secondaryKey];
          totalSecondaryLinked++;
        }
      }

      primaryCol.push([primaryUrl]);
      secondaryCol.push([secondaryUrl]);
    }

    // Batch update Columns O and P in a single operation
    if (primaryCol.length > 0) {
      sheet.getRange(2, 15, primaryCol.length, 1).setValues(primaryCol);
      sheet.getRange(2, 16, secondaryCol.length, 1).setValues(secondaryCol);
    }
  });

  const msg = "Category Photo Linking Complete!\n\n" +
              "• Total Files Scanned in Drive: " + totalFilesInDrive + "\n" +
              "• Primary Photos Linked (Col O across category tabs): " + totalPrimaryLinked + "\n" +
              "• Secondary Photos Linked (Col P across category tabs): " + totalSecondaryLinked;

  if (SpreadsheetApp.getUi()) {
    SpreadsheetApp.getUi().alert(msg);
  } else {
    Logger.log(msg);
  }
}
