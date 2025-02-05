import { DEFAULT_BLOCKED_URLS } from "./constants/defaultUrls";

// Initialize default blocked URLs if not already set
chrome.storage.sync.get(["blockedUrls"], (result) => {
  if (!result.blockedUrls) {
    chrome.storage.sync.set({ blockedUrls: DEFAULT_BLOCKED_URLS });
  }
});

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const { blockedUrls = [] } = await chrome.storage.sync.get(["blockedUrls"]);

  const url = new URL(details.url);
  const domain = url.hostname;

  // Check if the domain matches any blocked URLs
  const isBlocked = blockedUrls.some((blockedUrl) =>
    domain.includes(blockedUrl.replace(/^https?:\/\//, ""))
  );

  if (isBlocked) {
    // Redirect to a blocked page
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL("blocked.html"),
    });
  }
});
