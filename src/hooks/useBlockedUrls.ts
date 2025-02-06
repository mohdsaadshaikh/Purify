import { useState, useEffect } from "react";
import { DEFAULT_BLOCKED_URLS } from "../constants/defaultUrls";

export const useBlockedUrls = () => {
  const [blockedUrls, setBlockedUrls] = useState<string[]>([]);
  const [isExtension, setIsExtension] = useState(false);

  useEffect(() => {
    const isInExtension = typeof chrome !== "undefined" && !!chrome.storage;
    setIsExtension(isInExtension);

    if (isInExtension) {
      chrome.storage.sync.get(["blockedUrls"], (result) => {
        setBlockedUrls(result.blockedUrls || DEFAULT_BLOCKED_URLS);
      });
    } else {
      setBlockedUrls(DEFAULT_BLOCKED_URLS);
    }
  }, []);

  const addUrl = (newUrl: string) => {
    const updatedUrls = [...blockedUrls, newUrl];
    if (isExtension) {
      chrome.storage.sync.set({ blockedUrls: updatedUrls }, () => {
        setBlockedUrls(updatedUrls);
      });
    } else {
      setBlockedUrls(updatedUrls);
    }
  };

  const removeUrl = (urlToRemove: string) => {
    const updatedUrls = blockedUrls.filter((url) => url !== urlToRemove);
    if (isExtension) {
      chrome.storage.sync.set({ blockedUrls: updatedUrls }, () => {
        setBlockedUrls(updatedUrls);
      });
    } else {
      setBlockedUrls(updatedUrls);
    }
  };

  const editUrl = (oldUrl: string, newUrl: string) => {
    const updatedUrls = blockedUrls.map((url) =>
      url === oldUrl ? newUrl : url
    );
    if (isExtension) {
      chrome.storage.sync.set({ blockedUrls: updatedUrls }, () => {
        setBlockedUrls(updatedUrls);
      });
    } else {
      setBlockedUrls(updatedUrls);
    }
  };

  return {
    blockedUrls,
    isExtension,
    addUrl,
    removeUrl,
    editUrl,
  };
};
