// Simple script to update progress dots based on scroll position
document.addEventListener('DOMContentLoaded', () => {
  function wireCarousel(id, dotsSelector) {
    const carousel = document.getElementById(id);
    if (!carousel) return;
    const dots = document.querySelectorAll(dotsSelector + ' .dot');

    function update() {
      const children = Array.from(carousel.querySelectorAll('.card:not(.placeholder)'));
      if (children.length === 0) return;
      // compute nearest card index to center
      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      let closestIndex = 0;
      let closestDist = Infinity;
      children.forEach((c, i) => {
        const rect = c.getBoundingClientRect();
        // compute center relative to carousel
        const cLeft = c.offsetLeft + c.offsetWidth / 2;
        const dist = Math.abs(cLeft - center);
        if (dist < closestDist) { closestDist = dist; closestIndex = i; }
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
    }

    carousel.addEventListener('scroll', () => {
      window.requestAnimationFrame(update);
    });
    // initial
    update();
  }

  wireCarousel('trendingCarousel', '.progress-dots');
  // recommended carousel doesn't need dots but we keep snap behavior
});
