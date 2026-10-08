(function () {
  var d = document, b = d.body, reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // header: transparent over the hero, solid once scrolling
  function topState() { b.classList.toggle('at-top', window.scrollY < 40); }
  topState(); window.addEventListener('scroll', topState, { passive: true });

  // mobile menu
  var mb = d.querySelector('.menubtn'), mn = d.querySelector('.mnav');
  if (mb) mb.addEventListener('click', function () {
    var open = b.classList.toggle('menu-open');
    mb.setAttribute('aria-expanded', open); mn.setAttribute('aria-hidden', !open);
  });

  // auto-tag content for scroll reveals
  var sel = 'main section .eyebrow, main section h2, main section > .wrap > p, main section .card, main section .step, main section .fstep, main section .tier, main section details, main section .shot, main section .grid > *, main section .split > *, main section .est, main section table, main section .towns, main section .cta';
  d.querySelectorAll(sel).forEach(function (el) { if (!el.closest('[data-r]') && !el.querySelector('[data-r]')) el.setAttribute('data-r', ''); });
  // stagger siblings
  d.querySelectorAll('main section').forEach(function (s) {
    var groups = new Map();
    s.querySelectorAll('[data-r]').forEach(function (el) {
      var p = el.parentElement, n = groups.get(p) || 0;
      el.style.setProperty('--d', Math.min(n, 6) * 90 + 'ms'); groups.set(p, n + 1);
    });
  });
  var items = d.querySelectorAll('[data-r]');
  if (reduce || !('IntersectionObserver' in window)) { items.forEach(function (el) { el.classList.add('in'); }); }
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  // parallax fallback for browsers without scroll-driven animations
  if (!reduce && !(window.CSS && CSS.supports('animation-timeline: view()'))) {
    var ims = [].slice.call(d.querySelectorAll('.interlude img'));
    if (ims.length) {
      var tick = function () {
        var vh = window.innerHeight;
        ims.forEach(function (im) {
          var r = im.parentElement.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          var p = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
          im.style.transform = 'translateY(' + (-p * 18) + '%) scale(1.06)';
        });
      };
      window.addEventListener('scroll', function () { requestAnimationFrame(tick); }, { passive: true }); tick();
    }
  }

  // page transition fallback where cross-document view transitions aren't supported
  var nativeVT = 'onpagereveal' in window;
  if (!nativeVT && !reduce) {
    d.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      var href = a.getAttribute('href') || '';
      if (a.target || e.metaKey || e.ctrlKey || e.shiftKey || !/^[a-z-]+\.html(#.*)?$/.test(href)) return;
      if (href.split('#')[0] === location.pathname.split('/').pop()) return;
      e.preventDefault(); b.classList.add('leaving');
      setTimeout(function () { location.href = href; }, 320);
    });
    window.addEventListener('pageshow', function () { b.classList.remove('leaving'); });
  }
})();
