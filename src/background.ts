import { DEFAULT_BLOCKED_URLS } from "./constants/defaultUrls";

chrome.storage.sync.get(["blockedUrls"], (result) => {
  if (!result.blockedUrls) {
    chrome.storage.sync.set({ blockedUrls: DEFAULT_BLOCKED_URLS });
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const { blockedUrls = [] }: { blockedUrls: string[] } =
    await chrome.storage.sync.get(["blockedUrls"]);

  const url: string = details.url;

  const isBlocked = blockedUrls.some((blockedUrl: string) => {
    const pattern = new RegExp(
      `^${blockedUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
    );
    return pattern.test(url);
  });

  if (isBlocked) {
    const isAdultSite = checkIfAdultSite(url);
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL(
        isAdultSite
          ? "blocked-pages/blocked.html"
          : "blocked-pages/defaultBlocked.html"
      ),
    });
  }
});

function checkIfAdultSite(url: string): boolean {
  const adultSites = ["porn", "adult", "xxx", "xhamster"];
  return adultSites.some((site) => url.includes(site));
}
