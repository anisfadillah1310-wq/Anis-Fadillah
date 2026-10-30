/* ========================================================
   ANIS FADILLAH - CV & PORTOFOLIO WEBSITE
   Jakarta Business School
   Script (JavaScript ES6+)
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------
     1. THEME SWITCHER (DARK / LIGHT MODE)
     ---------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const STORAGE_KEY = 'anis_cv_theme';

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) {
    if (savedTheme === 'dark') {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    }
  } else {
    // Default: light mode as CV standard, but respects system dark preference if preferred
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem(STORAGE_KEY, 'light');
        showToast('Mode Terang diaktifkan');
      } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem(STORAGE_KEY, 'dark');
        showToast('Mode Gelap diaktifkan');
      }
    });
  }

  /* ----------------------------------------------------
     2. DYNAMIC TYPING EFFECT (HERO SECTION)
     ---------------------------------------------------- */
  const typingElement = document.getElementById('typingText');
  const words = [
    'Digital Business & E-Commerce',
    'Social Media Strategist & Planner',
    'Content Creator & Video Editor',
    'Administrative & Documentation Specialist',
    'Creative Designer (Canva & CapCut)'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 40;
  const holdDelay = 1800;

  function typeEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, holdDelay);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 300);
      return;
    }

    const nextSpeed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, nextSpeed);
  }

  typeEffect();

  /* ----------------------------------------------------
     3. EXPERIENCE FILTER TABS
     ---------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const expCards = document.querySelectorAll('.exp-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      expCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // subtle fade-in animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ----------------------------------------------------
     4. MOBILE NAVIGATION TOGGLE
     ---------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        mobileMenuBtn.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        mobileMenuBtn.children[1].style.opacity = '0';
        mobileMenuBtn.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        mobileMenuBtn.children[0].style.transform = 'none';
        mobileMenuBtn.children[1].style.opacity = '1';
        mobileMenuBtn.children[2].style.transform = 'none';
      }
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.children[0].style.transform = 'none';
        mobileMenuBtn.children[1].style.opacity = '1';
        mobileMenuBtn.children[2].style.transform = 'none';
      });
    });
  }

  /* ----------------------------------------------------
     5. SCROLL SPY & NAVBAR ACTIVE STATE
     ---------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Toggle Back to top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    }
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  /* ----------------------------------------------------
     6. PRINT CV TRIGGER
     ---------------------------------------------------- */
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ----------------------------------------------------
     7. BACK TO TOP
     ---------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ----------------------------------------------------
     8. PDF MODAL VIEWER EVENT LISTENERS
     ---------------------------------------------------- */
  const pdfModal = document.getElementById('pdfModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const pdfFrame = document.getElementById('pdfFrame');

  if (modalCloseBtn && pdfModal) {
    modalCloseBtn.addEventListener('click', closePdfModal);
    
    // Close on backdrop click
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) {
        closePdfModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
        closePdfModal();
      }
    });
  }
});

/* ========================================================
   GLOBAL UTILITY FUNCTIONS
   ======================================================== */

// 1. Toast Notification
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// 2. Copy to Clipboard
function copyToClipboard(text, label = 'Teks') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} berhasil disalin ke clipboard!`);
    }).catch(() => {
      fallbackCopyText(text, label);
    });
  } else {
    fallbackCopyText(text, label);
  }
}

function fallbackCopyText(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`${label} berhasil disalin!`);
  } catch (err) {
    showToast(`Gagal menyalin: ${text}`);
  }
  document.body.removeChild(textArea);
}

// 3. Open PDF Modal Viewer
function openPdfModal(pdfUrl, title = 'Pratinjau Dokumen') {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');
  const modalTitle = document.getElementById('pdfModalTitle');
  const modalDownload = document.getElementById('modalDownloadLink');
  const modalNewTab = document.getElementById('modalNewTabLink');

  if (!modal || !frame) return;

  frame.src = pdfUrl;
  if (modalTitle) modalTitle.textContent = title;
  if (modalNewTab) modalNewTab.href = pdfUrl;
  if (modalDownload) {
    modalDownload.href = pdfUrl;
    modalDownload.download = pdfUrl.split('/').pop();
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

// 4. Close PDF Modal Viewer
function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  const frame = document.getElementById('pdfFrame');

  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  
  if (frame) {
    frame.src = '';
  }
}

// 5. Contact Form WhatsApp Submitter
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('senderName')?.value.trim() || 'Rekan';
  const subject = document.getElementById('senderSubject')?.value || 'Peluang Kerja / Magang';
  const message = document.getElementById('senderMessage')?.value.trim() || '';

  const waNumber = '6281213587477';
  const formattedText = `Halo Anis Fadillah,\n\nNama/Instansi: ${name}\nPerihal: ${subject}\n\nPesan:\n${message}\n\n(Dikirim melalui Website CV Anis Fadillah)`;

  const encodedUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(formattedText)}`;
  window.open(encodedUrl, '_blank');
  showToast('Membuka WhatsApp untuk mengirim pesan...');
}

// 6. Contact Form Email Submitter
function sendViaEmail() {
  const name = document.getElementById('senderName')?.value.trim() || 'Rekan';
  const subject = document.getElementById('senderSubject')?.value || 'Peluang Kerja / Magang';
  const message = document.getElementById('senderMessage')?.value.trim() || '';

  const email = 'anisfadillah1310@gmail.com';
  const mailSubject = `[Website CV] ${subject} - ${name}`;
  const mailBody = `Halo Anis Fadillah,\n\nSaya ${name}.\n\n${message}\n\nSalam,\n${name}`;

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  window.location.href = mailtoUrl;
  showToast('Membuka aplikasi Email...');
}
