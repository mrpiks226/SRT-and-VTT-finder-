// Listener for network requests
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = details.url.toLowerCase();
    if (url.includes(".vtt") || url.includes(".srt")) {
      // Get current stored subs, add new one, and save back
      chrome.storage.local.get({ foundSubs: [] }, (data) => {
        const subs = data.foundSubs;
        if (!subs.includes(details.url)) {
          subs.push(details.url);
          chrome.storage.local.set({ foundSubs: subs });
          console.log("Subtitle captured:", details.url);
        }
      });
    }
  },
  { urls: ["<all_urls>"] }
);

// Clear list when a tab is refreshed to keep it clean
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    chrome.storage.local.set({ foundSubs: [] });
  }
});
