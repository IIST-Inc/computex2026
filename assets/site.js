(function () {
  const YOUTUBE_URL = "TODO_YOUTUBE_URL";

  function pageDescription() {
    const description = document.querySelector('meta[name="description"]');
    return description ? description.content : "IIST COMPUTEX 2026 hardware trust brochure.";
  }

  function setStatus(button, text) {
    const id = button.getAttribute("aria-describedby");
    if (!id) {
      return;
    }
    const status = document.getElementById(id);
    if (!status) {
      return;
    }
    status.textContent = text;
    window.setTimeout(function () {
      status.textContent = "";
    }, 2600);
  }

  async function sharePage(button) {
    const shareData = {
      title: document.title,
      text: pageDescription(),
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(window.location.href);
      setStatus(button, "Link copied.");
      return;
    }

    setStatus(button, window.location.href);
  }

  document.addEventListener("click", function (event) {
    const printButton = event.target.closest("[data-print-page]");
    if (printButton) {
      event.preventDefault();
      window.print();
      return;
    }

    const shareButton = event.target.closest("[data-share-page]");
    if (shareButton) {
      event.preventDefault();
      sharePage(shareButton).catch(function () {
        setStatus(shareButton, "Share was not completed.");
      });
      return;
    }

    const videoLink = event.target.closest("[data-video-placeholder]");
    if (videoLink && (!YOUTUBE_URL || YOUTUBE_URL === "TODO_YOUTUBE_URL")) {
      event.preventDefault();
      const status = document.getElementById("video-status");
      if (status) {
        status.textContent = "Video link placeholder: replace TODO_YOUTUBE_URL in assets/site.js.";
      }
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    if (YOUTUBE_URL && YOUTUBE_URL !== "TODO_YOUTUBE_URL") {
      document.querySelectorAll("[data-video-placeholder]").forEach(function (link) {
        link.href = YOUTUBE_URL;
        link.removeAttribute("data-video-placeholder");
      });
    }
  });
})();
