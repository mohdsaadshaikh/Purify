import { DEFAULT_BLOCKED_URLS } from "./constants/defaultUrls";

chrome.storage.sync.get(["blockedUrls"], (result) => {
  if (!result.blockedUrls) {
    chrome.storage.sync.set({ blockedUrls: DEFAULT_BLOCKED_URLS });
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const { blockedUrls = [] } = await chrome.storage.sync.get(["blockedUrls"]);

  const url = new URL(details.url);
  const domain = url.hostname;

  const isBlocked = blockedUrls.some((blockedUrl: string) =>
    domain.includes(blockedUrl.replace(/^https?:\/\//, ""))
  );

  if (isBlocked) {
    const isAdultSite = checkIfAdultSite(domain);
    if (isAdultSite) {
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("blocked-pages/blocked.html"),
      });
    } else {
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("blocked-pages/defaultBlocked.html"),
      });
    }
  }
});

function checkIfAdultSite(domain: string) {
  const adultSites = ["porn", "adult", "xxx", "xhamster"];
  return adultSites.some((site) => domain.includes(site));
}
