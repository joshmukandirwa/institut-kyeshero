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

/* ===========================================================
   LIENS EXTERNES PAS ENCORE DISPONIBLES (WhatsApp, Facebook, X,
   Instagram, etc.) — affiche un petit message au clic
   =========================================================== */
(function () {
  var toast = document.getElementById('comingSoonToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'comingSoonToast';
    toast.className = 'coming-soon-toast';
    toast.innerHTML = '<i class="fa-solid fa-circle-info"></i><span>Ce lien n\'est pas encore disponible. Revenez bientôt !</span>';
    document.body.appendChild(toast);
  }

  var hideTimeout;
  function showComingSoonToast() {
    toast.classList.add('show');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(function () {
      toast.classList.remove('show');
    }, 2500);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('.js-coming-soon');
    if (link) {
      e.preventDefault();
      showComingSoonToast();
    }
  });
})();
