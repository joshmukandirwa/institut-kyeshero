/* ===========================================================
   FOOTER — comportement accordéon (mobile) / colonnes (desktop)
   =========================================================== */
(function () {
  var BREAKPOINT = 768;
  var cols = document.querySelectorAll('#main-footer .footer-col');

  function applyLayout() {
    var isDesktop = window.innerWidth >= BREAKPOINT;
    cols.forEach(function (col) {
      if (isDesktop) {
        col.setAttribute('open', '');
      } else if (!col.dataset.userToggled) {
        col.removeAttribute('open');
      }
    });
  }

  cols.forEach(function (col) {
    col.addEventListener('toggle', function () {
      if (window.innerWidth < BREAKPOINT) {
        col.dataset.userToggled = 'true';
      }
    });
  });

  window.addEventListener('resize', applyLayout);
  applyLayout();
})();
