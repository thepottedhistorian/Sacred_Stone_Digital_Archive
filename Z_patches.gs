/**
 * patches.gs — 🛠️ Baronial Social Tools (Patch Folio)
 * Contains independent patches for system maintenance and cleaning.
 * Part of the SCA Webministry Suite - Sacred Stone
 */



/* ============================================================
   SECTION I: ONE-TIME CLEANUP — PURGE OLD MIRROR EVENTS
   ============================================================ */
function purgeOldMirrorEvents() {
  // SANITIZED: Pulling from Script Properties
  const calId = CONFIG.get("MIRROR_CALENDAR_ID");
  const cal = CalendarApp.getCalendarById(calId);

  if (!cal) {
    SpreadsheetApp.getUi().alert("Error: Could not find Mirror Calendar.");
    return;
  }

  const events = cal.getEvents(
    new Date(new Date().getFullYear(), 0, 1),
    new Date(new Date().getFullYear() + 1, 11, 31)
  );

  events.forEach(e => e.deleteEvent());

  SpreadsheetApp.getUi().alert(
    "All mirror events removed.\nRun 'Sync Kingdom Mirror' to repopulate."
  );
}

/* ============================================================
   SECTION II: BARONIAL DESCRIPTION CLEANER
   ============================================================ */
function cleanBaronialDescription(desc) {
  if (!desc) return "";

  return desc
    .replace(/<[^>]*>/g, " ")          // Remove HTML
    .replace(/https?:\/\/\S+/g, " $& ") // Ensure spacing around URLs
    .replace(/\s+/g, " ")               // Normalize whitespace
    .trim();
}

/* ============================================================
   SECTION III: IMPROVED KINGDOM DESCRIPTION EXTRACTOR
   ============================================================ */
function extractCleanDescription(html) {
  if (!html) return "";

  // Try multiple possible description containers
  let descMatch =
    html.match(/<div[^>]*class="event-description"[^>]*>([\s\S]*?)<\/div>/i) ||
    html.match(/<section[^>]*class="event-description"[^>]*>([\s\S]*?)<\/section>/i) ||
    html.match(/<div[^>]*id="event-description"[^>]*>([\s\S]*?)<\/div>/i);

  // Fallback: first <p> block on the page
  if (!descMatch) {
    descMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  }

  if (!descMatch) return "";

  let text = descMatch[1];

  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, " ");

  // Convert bullet lists into a single sentence
  const bullets = text.match(/•\s*([^\n]+)/g);
  if (bullets) {
    const items = bullets.map(b => b.replace(/•\s*/, "").trim());
    const sentence = "Activities include " + items.join(", ") + ". ";
    text = sentence + text.replace(/•[\s\S]*?(?=\n|$)/g, "");
  }

  // Normalize whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Split into paragraphs
  let paragraphs = text.split(/(?<=\.)\s+/);

  // Keep up to two meaningful paragraphs
  paragraphs = paragraphs.filter(p => p.length > 20).slice(0, 2);

  return paragraphs.join(" ");
}