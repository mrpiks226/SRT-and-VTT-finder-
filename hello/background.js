const subtitleExtensions = ["srt", "vtt"];

chrome.webRequest.onCompleted.addListener(
  (details) => {
    const url = details.url.toLowerCase();
    if (subtitleExtensions.some(ext => url.includes("." + ext))) {
      chrome.storage.local.get({ subs: [] }, (data) => {
        const subs = data.subs;
        if (!subs.includes(details.url)) {
          subs.push(details.url);
          chrome.storage.local.set({ subs });
        }
      });
    }
  },
  { urls: ["<all_urls>"] }
);
