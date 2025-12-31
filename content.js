function hideShorts() {
  // Remove Shorts shelves on homepage
  document.querySelectorAll("ytd-rich-section-renderer").forEach(section => {
    if (section.innerText.toLowerCase().includes("shorts")) {
      section.remove();
    }
  });

  // Remove Shorts from grid/search/channel results
  document.querySelectorAll("ytd-video-renderer, ytd-grid-video-renderer", "shortsLockupViewModelHost").forEach(video => {
    const link = video.querySelector("a");
    if (link && link.href && link.href.includes("/shorts/")) {
      video.remove();
    }
  });

  // Remove Shorts tab from sidebar
  document.querySelectorAll("ytd-guide-entry-renderer").forEach(entry => {
    if (entry.innerText.toLowerCase().includes("shorts")) {
      entry.remove();
    }
  });

  // Remove all shorts containers
  document.querySelectorAll("ytm-shorts-lockup-view-model").forEach(view => {
    view.remove();
  });

  // remove shorts disguising themselves as feed videos
  document.querySelectorAll("ytm-media-item").forEach(video => {
    const overlay = video.querySelector("ytm-thumbnail-overlay-time-status-renderer")
    if (overlay && overlay.dataset.style == "SHORTS") {
      video.remove();
    }
  });
}

// Run once
hideShorts();

// Run again whenever YouTube dynamically loads content
const observer = new MutationObserver(hideShorts);
observer.observe(document.body, { childList: true, subtree: true });
