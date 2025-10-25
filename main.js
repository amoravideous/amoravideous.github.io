// main.js — termasuk injeksi kode iklan + logika carousel

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------
  // 1) Injeksi kode iklan
  // -------------------------
  // Cari container tempat iklan berada (ads-row). Jika tidak ada, buat di akhir body.
  (function injectAd() {
    const adContainerId = 'container-0e97c7a948064ca0c2f9d4773999b923';
    const scriptSrc = '//pl26898829.profitableratecpm.com/0e97c7a948064ca0c2f9d4773999b923/invoke.js';

    let target = document.querySelector('.ads-row');
    // jika .ads-row tidak ada, fallback ke .ads-strip lalu ke body
    if (!target) target = document.querySelector('.ads-strip') || document.body;

    // jangan duplikasi jika sudah ada
    if (!document.getElementById(adContainerId)) {
      const container = document.createElement('div');
      container.id = adContainerId;
      // opsional: beri kelas untuk styling jika perlu
      container.className = 'injected-ad-container';

      // sisipkan container di awal target agar tampil pertama di baris iklan
      if (target.firstChild) target.insertBefore(container, target.firstChild);
      else target.appendChild(container);

      // buat tag script dan set atribut sesuai permintaan
      const s = document.createElement('script');
      s.async = true;
      s.setAttribute('data-cfasync', 'false');
      s.src = scriptSrc;

      // tambahkan script ke dalam container agar iklan ditempatkan di div yang benar
      container.appendChild(s);
    }
  })();

  // -------------------------
  // 2) Logika carousel (progress dots)
  // -------------------------
  function wireCarousel(id, dotsSelector) {
    const carousel = document.getElementById(id);
    if (!carousel) return;
    const dots = document.querySelectorAll(dotsSelector + ' .dot');

    function update() {
      const children = Array.from(carousel.querySelectorAll('.card'));
      if (children.length === 0) return;
      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      let closestIndex = 0;
      let closestDist = Infinity;
      children.forEach((c, i) => {
        const cLeft = c.offsetLeft + c.offsetWidth / 2;
        const dist = Math.abs(cLeft - center);
        if (dist < closestDist) { closestDist = dist; closestIndex = i; }
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
    }

    carousel.addEventListener('scroll', () => {
      window.requestAnimationFrame(update);
    });
    // initial update
    update();
  }

  wireCarousel('trendingCarousel', '.progress-dots');
  // jika perlu, kamu bisa tambahkan wireCarousel untuk recommended dengan dots terpisah
});
