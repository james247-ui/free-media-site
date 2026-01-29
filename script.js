// Lightweight & safer image + background-image cache buster
// Console-safe for most sites (display-only)

(function () {
  const timestamp = Date.now();
  const nonce = (Math.random() * 10000) | 0;

  // 1. Reload <img> elements safely
  document.querySelectorAll('img[src]').forEach(img => {
    try {
      const url = new URL(img.src, window.location.href);

      // Avoid duplicate cache-busters
      if (!url.searchParams.has('_cb')) {
        url.searchParams.set('_cb', `${timestamp}${nonce}`);
        img.src = url.href;
      }
    } catch (e) {
      // skip invalid URLs
    }
  });

  // 2. Reload background-images (only when present)
  const elements = document.querySelectorAll('*');

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const bg = getComputedStyle(el).backgroundImage;

    if (bg && bg !== 'none' && bg.includes('url')) {
      const original = bg;
      el.style.backgroundImage = 'none';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.backgroundImage = original;
        });
      });
    }
  }

  console.log('Image & background-image cache-bust attempted');
})();
