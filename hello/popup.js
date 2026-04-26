document.addEventListener('DOMContentLoaded', () => {
  const listDiv = document.getElementById('subList');

  chrome.storage.local.get({ foundSubs: [] }, (data) => {
    if (data.foundSubs.length === 0) {
      listDiv.innerText = "No subtitles found yet. Try playing the video.";
      return;
    }

    listDiv.innerHTML = ""; // Clear "Searching..." text
    data.foundSubs.forEach((url, index) => {
      const item = document.createElement('div');
      item.className = 'sub-item';
      
      const link = document.createElement('a');
      link.href = url;
      link.target = "_blank";
      link.innerText = `Subtitle File ${index + 1} (${url.split('.').pop().split('?')[0].toUpperCase()})`;
      
      item.appendChild(link);
      listDiv.appendChild(item);
    });
  });
});
