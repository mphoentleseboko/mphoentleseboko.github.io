<script>
  // ---- NAVIGATION ----
  const pages = ['home','about','menu','gallery','testimonials','contact'];

  function navigate(page) {
    pages.forEach(p => {
      document.getElementById('page-'+p).classList.remove('active');
    });
    document.getElementById('page-'+page).classList.add('active');
    window.scrollTo(0,0);
    closeSidebar();
  }

  // ---- MOBILE SIDEBAR ----
  function toggleSidebar() {
    const overlay = document.getElementById('sidebarOverlay');
    // Find active sidebar
    pages.forEach(p => {
      const sidebar = document.getElementById('sidebar-'+p);
      if (sidebar) sidebar.classList.toggle('open');
    });
    overlay.classList.toggle('active');
  }
  function closeSidebar() {
    pages.forEach(p => {
      const s = document.getElementById('sidebar-'+p);
      if (s) s.classList.remove('open');
    });
    document.getElementById('sidebarOverlay').classList.remove('active');
  }

  // ---- HERO SLIDER ----
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('sliderDots');

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i===0?' active':'');
    d.onclick = () => goToSlide(i);
    dotsContainer.appendChild(d);
  });

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    dotsContainer.children[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active-slide');
    dotsContainer.children[currentSlide].classList.add('active');
  }

  function changeSlide(dir) { goToSlide(currentSlide + dir); }

  // Auto-advance slider every 5s
  setInterval(() => changeSlide(1), 5000);

  // ---- MENU FILTER ----
  function filterMenu(cat) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
      item.style.display = (cat==='all' || item.dataset.cat===cat) ? 'flex' : 'none';
    });
    ['all','bread','pastry','cake','drink'].forEach(c => {
      const btn = document.getElementById('cat-'+c);
      if (btn) btn.classList.toggle('active-nav', c===cat);
    });
  }

  // ---- ADD TO CART TOAST ----
  let toastTimeout;
  function addToCart(name) {
    const toast = document.getElementById('cartToast');
    toast.textContent = '🛒 Added: ' + name;
    toast.style.display = 'block';
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { toast.style.display='none'; }, 2500);
  }

  // ---- GALLERY LIGHTBOX ----
  function openLightbox(emoji, title) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lbEmoji').textContent = emoji;
    document.getElementById('lbTitle').textContent = title;
    lb.style.display = 'flex';
  }
  function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
  }

  // ---- CONTACT FORM ----
  function submitContactForm() {
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const err = document.getElementById('formError');
    const success = document.getElementById('formSuccess');
    err.style.display = 'none';
    success.style.display = 'none';
    if (!fname || !lname || !email || !subject || !message) {
      err.style.display = 'block';
      return;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
      err.textContent = '⚠️ Please enter a valid email address.';
      err.style.display = 'block';
      return;
    }
    // Reset form
    ['fname','lname','email','phone','message'].forEach(id => document.getElementById(id).value='');
    document.getElementById('subject').value='';
    success.style.display = 'block';
    success.scrollIntoView({behavior:'smooth', block:'center'});
  }
</script>
