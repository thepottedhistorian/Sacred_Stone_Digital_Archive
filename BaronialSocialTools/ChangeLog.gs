/**
 * 🛡️ BARONIAL SOCIAL TOOLS - CHANGE LOG
 * --------------------------------------------------------------------------
 * This file tracks all major updates, bug fixes, and logic changes.
 * Use this to trace back when a specific feature was added or modified.
 * --------------------------------------------------------------------------
 */

/*
  [2026-06-05] - THE "SECURITY & PORTABILITY" UPDATE
  ---------------------------------------------------------------------------
  * MIGRATED: Moved all sensitive configuration data (Calendar IDs, Webhook URLs, 
    Emails) from the 'Settings' spreadsheet tab to 'Google Apps Script Properties'.
  * ADDED: Implemented a standardized 'CONFIG' helper object across all .gs 
    files for secure and efficient property retrieval.
  * CLEANED: Refactored main.gs, automation.gs, digest.gs, discord.gs, and 
    online_sync.gs to eliminate reliance on spreadsheet-based settings lookups.
  * UPDATED: Unified the project manifest in 0_README.gs to reflect the new 
    security architecture.
  * FIXED: Restored complete administrative toolkit functionality in 
    Automation.gs and Discord.gs after previous refactoring omissions.

  [2026-03-16] - THE "DYNAMIC DISCORD & EMAIL" UPDATE
  ---------------------------------------------------------------------------
  * FIXED: Resolved "silent failure" in Google Group email delivery by 
    validating the recipient address from the Settings sheet.
  * FIXED: Discord "Online Activities" now uses a Universal Splitter logic. 
    It dynamically creates Part 1, Part 2, etc., based on content length to 
    bypass Discord's 4096-character embed limit.
  * FIXED: Text-cleaning helper added to remove HTML entities (&nbsp;) 
    from Discord posts for a cleaner visual appearance.
  * UPDATED: Anchored "Please Note" instructions and contact info to the 
    very last block of the Discord post to maintain logical flow.
  * CLEANED: Removed "Continued in next block..." text for a more seamless 
    reading experience on mobile.

  [2026-03-13] - THE "EMOJI VICTORY" UPDATE
  ---------------------------------------------------------------------------
  * FIXED: Resolved "Mojibake" (question mark diamonds) in Gmail by switching 
    from GmailApp to MailApp with a forced HTML body.
  * FIXED: Data leakage between calendar events by adding variable resets 
    at the start of the event loop in Digest.gs.
  * ADDED: 'Copy to Clipboard' button in DigestModal.html for easy social 
    media cross-posting.
  * ADDED: Comprehensive header comments across all .gs and .html files.
  * ADDED: 0_ReadMe.gs for project architecture overview.

  [2026-03-11] - DISCORD STAGING UPDATE
  ---------------------------------------------------------------------------
  * ADDED: Multi-stage delivery for Discord webhooks to bypass the 2000 
    character limit.
  * ADDED: Sleep timers (2 seconds) between Discord posts to prevent rate-limiting.
  * UPDATED: DiscordPreview.html to allow final edits before firing webhooks.

  [2026-02-23] - PROJECT INITIALIZATION
  ---------------------------------------------------------------------------
  * INITIAL: Created core loop to fetch Baronial Calendar events.
  * ADDED: Settings sheet integration to avoid hard-coding Calendar IDs.
*/