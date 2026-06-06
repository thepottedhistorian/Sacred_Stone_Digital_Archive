/**
 * discord.gs - 🛡️ Discord Delivery Engine
 * Manages multi-stage delivery of the digest to Discord webhooks.
 * Part of the SCA Webministry Suite - Sacred Stone
 */



/* ============================================================
   SECTION I: CORE FUNCTION — sendDiscordDigest
   ============================================================ */
function sendDiscordDigest(sections) {

  const webhookUrl = CONFIG.get("DISCORD_WEBHOOK");
  if (!webhookUrl) throw new Error("DISCORD_WEBHOOK property is not set.");

  /* ------------------------------------------------------------
     Helper: clean
     Removes HTML entities and trims whitespace.
     ------------------------------------------------------------ */
  const clean = function(str) {
    return String(str).replace(/&nbsp;/g, " ").trim();
  };

  /* ------------------------------------------------------------
     Helper: options
     Prepares the JSON payload for UrlFetchApp.
     ------------------------------------------------------------ */
  const options = function(payload) {
    return {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
  };

  /* ------------------------------------------------------------
     Helper: fetchWithRetry
     Executes the webhook post and handles 429 rate limits dynamically.
     ------------------------------------------------------------ */
  const fetchWithRetry = function(url, fetchOptions, maxRetries = 5) {
    var retries = 0;
    var delay = 3000; 

    while (retries < maxRetries) {
      var response = UrlFetchApp.fetch(url, fetchOptions);
      var responseCode = response.getResponseCode();

      if (responseCode === 200 || responseCode === 204) {
        return response; 
      } 
      
      if (responseCode === 429) {
        var responseText = response.getContentText();
        var retryAfterMs = delay;

        try {
          var rateData = JSON.parse(responseText);
          if (rateData.retry_after) {
            retryAfterMs = (rateData.retry_after * 1000) + 500;
          }
        } catch (e) {
          retryAfterMs = delay * Math.pow(2, retries);
        }

        Logger.log("Rate limited (Status " + responseCode + "). Retrying in " + retryAfterMs + "ms... (Attempt " + (retries + 1) + " of " + maxRetries + ")");
        Utilities.sleep(retryAfterMs);
        retries++;
      } else {
        throw new Error("Discord Webhook failed with status code " + responseCode + ": " + response.getContentText());
      }
    }
    throw new Error("Failed to deliver message after " + maxRetries + " rate-limit retry attempts.");
  };

  /* ============================================================
     STAGE I: HEADER AND BARONIAL EVENTS
     ============================================================ */
  fetchWithRetry(webhookUrl, options({
    content: clean(sections.header) + "\n_ _",
    embeds: [{
      title: "🏰 BARONIAL & CANTON EVENTS",
      description: clean(sections.barony).substring(0, 4000),
      color: 32768
    }]
  }));

  Utilities.sleep(3000);

  /* ============================================================
     STAGE II: KINGDOM EVENTS
     ============================================================ */
  fetchWithRetry(webhookUrl, options({
    content: "",
    embeds: [{
      title: "👑 KINGDOM EVENTS",
      description: clean(sections.kingdom).substring(0, 4000),
      color: 16766720
    }]
  }));

  Utilities.sleep(3000);

  /* ============================================================
     STAGE III: ONLINE ACTIVITIES (DYNAMIC SPLITTING)
     ============================================================ */
  const rawOnline = clean(sections.online);
  const footerBlock = "\n\n" + clean(sections.footer);

  const chunkSize = 3500;
  const chunks = [];
  for (var i = 0; i < rawOnline.length; i += chunkSize) {
    chunks.push(rawOnline.substring(i, i + chunkSize));
  }

  if (chunks.length === 0) {
    chunks.push("No specific online activities listed for this week.");
  }

  chunks.forEach(function(chunk, index) {
    var isLast = (index === chunks.length - 1);
    var description = chunk;

    if (isLast) {
      description += footerBlock;
    }

    fetchWithRetry(webhookUrl, options({
      content: "",
      embeds: [{
        title: "🌐 SCA ONLINE ACTIVITIES " + (chunks.length > 1 ? "(Part " + (index + 1) + ")" : ""),
        description: description.substring(0, 4000),
        color: 3447003
      }]
    }));

    Utilities.sleep(3000);
  });

  /* ============================================================
     STAGE IV: FINAL SIGNATURE
     ============================================================ */
  fetchWithRetry(webhookUrl, options({
    content: clean(sections.footer) || " "
  }));
}

/* ============================================================
   TEST FUNCTION — testDiscordWebhook
   ============================================================ */
function testDiscordWebhook() {
  const webhookUrl = CONFIG.get("DISCORD_WEBHOOK");

  const payload = {
    content: "🧪 Test message from Google Apps Script.\nIf you see this, the webhook is working!"
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(webhookUrl, options);
  Logger.log(response.getResponseCode());
  Logger.log(response.getContentText());
}
