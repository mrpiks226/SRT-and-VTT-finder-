const container = document.getElementById("subs");

chrome.storage.local.get({ subs: [] }, (data) => {
  if (data.subs.length === 0) {
    container.innerText = "No subtitles found.";
    return;
  }

  data.subs.forEach((url, i) => {
    const btn = document.createElement("button");
    btn.textContent = `Download subtitle ${i + 1}`;
    btn.onclick = () => {
      chrome.downloads.download({
        url,
        filename: `subtitle_${i + 1}.srt`
      });
    };
    container.appendChild(btn);
  });
});
