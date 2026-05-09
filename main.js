/* FloraVision — main.js */
document.addEventListener('DOMContentLoaded', () => {

  /* ── MOBILE MENU ── */
  const ham    = document.getElementById('hamburger');
  const mobBg  = document.getElementById('mobBg');
  const mobMen = document.getElementById('mobMenu');
  const mobCls = document.getElementById('mobClose');

  const openMob  = () => { mobBg.classList.add('open'); mobMen.classList.add('open'); document.body.style.overflow='hidden'; };
  const closeMob = () => { mobBg.classList.remove('open'); mobMen.classList.remove('open'); document.body.style.overflow=''; };

  ham?.addEventListener('click', openMob);
  mobBg?.addEventListener('click', closeMob);
  mobCls?.addEventListener('click', closeMob);
  document.querySelectorAll('.mob-menu a').forEach(a => a.addEventListener('click', closeMob));

  /* ── NAVBAR SCROLL ── */
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 20
      ? 'rgba(14,22,14,0.97)'
      : 'rgba(20,30,20,0.88)';
  }, { passive: true });

  /* ── HERO PRODUCT CARD: cycle plants ── */
  const plants = [
    { name:'Aglaonema plant', label:'Indoor Plant',  img:'https://images.unsplash.com/photo-1602923668104-8f9e03b77b5d?w=220&h=148&fit=crop&crop=center' },
    { name:'Snake Plant',     label:'Air Purifier',  img:'https://images.unsplash.com/photo-1585687433141-f1f14a0c52df?w=220&h=148&fit=crop&crop=center' },
    { name:'Peace Lily',      label:'Flowering',     img:'https://images.unsplash.com/photo-1587395651915-d56d7f4a6c24?w=220&h=148&fit=crop&crop=center' },
    { name:'Cactus',          label:'Outdoor Plant', img:'https://images.unsplash.com/photo-1543702400-3d3dd4e3e0ec?w=220&h=148&fit=crop&crop=center' },
  ];
  let pi = 0;
  const pPhoto = document.getElementById('hpcPhoto');
  const pName  = document.getElementById('hpcName');
  const pLabel = document.getElementById('hpcLabel');
  const pDots  = document.querySelectorAll('.hpc-dot');

  function setPlant(i) {
    pi = (i + plants.length) % plants.length;
    if (pPhoto) pPhoto.src = plants[pi].img;
    if (pName)  pName.textContent  = plants[pi].name;
    if (pLabel) pLabel.textContent = plants[pi].label;
    pDots.forEach((d,j) => d.classList.toggle('active', j === pi % pDots.length));
  }
  document.getElementById('hpcArrow')?.addEventListener('click', () => setPlant(pi+1));
  pDots.forEach((d,i) => d.addEventListener('click', () => setPlant(i)));

  /* ── O2 PAGINATION ── */
  const pgs = ['01/04','02/04','03/04','04/04'];
  let oi = 0;
  const opg = document.getElementById('o2Pg');
  document.getElementById('o2Next')?.addEventListener('click', () => { oi=(oi+1)%pgs.length; opg.textContent=pgs[oi]; });
  document.getElementById('o2Prev')?.addEventListener('click', () => { oi=(oi-1+pgs.length)%pgs.length; opg.textContent=pgs[oi]; });

  /* ── CART FEEDBACK ── */
  window.addCart = function(btn) {
    const orig = btn.innerHTML;
    btn.style.background = '#7bc67e';
    btn.style.borderColor = '#7bc67e';
    setTimeout(() => { btn.style.background=''; btn.style.borderColor=''; }, 700);
    showToast('Plant added to cart 🌿');
  };

  /* ── NEWSLETTER ── */
  document.getElementById('subBtn')?.addEventListener('click', () => {
    const v = document.getElementById('newsInput')?.value || '';
    showToast(v.includes('@') ? 'Subscribed! 🌿' : 'Enter a valid email.');
    if (v.includes('@')) document.getElementById('newsInput').value = '';
  });

  /* ── TOAST ── */
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ── SCROLL REVEAL ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = +e.target.dataset.d || 0;
        setTimeout(() => e.target.classList.add('in'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  ['.tc','.sell-card','.rv-card','.o2-wrap','.sec-head'].forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('sr');
      el.dataset.d = i * 65;
      io.observe(el);
    });
  });

  /* ── ACTIVE NAV ── */
  const secs = document.querySelectorAll('section[id],footer[id]');
  const nas  = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 70) cur = s.id; });
    nas.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+cur));
  }, { passive: true });

});
