document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = [
    { filename: 'desain-produk-01.jpg', title: 'Konten Promosi Produk Kesehatan', category: 'magang', orientation: 'portrait', caption: 'Materi visual promosi produk dari bagian Design Graphic Product dalam portofolio.' },
    { filename: 'desain-produk-02.jpg', title: 'Konten Edukasi Asam Lambung', category: 'magang', orientation: 'portrait', caption: 'Desain edukasi produk dengan pesan utama tentang asam lambung dan aktivitas harian.' },
    { filename: 'desain-produk-03.jpg', title: 'Kampanye Hijaukan Harimu', category: 'magang', orientation: 'portrait', caption: 'Visual kampanye produk dengan pendekatan warna hijau dan pesan gaya hidup.' },
    { filename: 'desain-produk-04.jpg', title: 'Kampanye Perawatan Kulit', category: 'magang', orientation: 'portrait', caption: 'Materi promosi produk perawatan kulit yang ditampilkan pada portofolio.' },
    { filename: 'fotografi-kegiatan-01.jpg', title: 'Dokumentasi Kegiatan Mahasiswa', category: 'organisasi', orientation: 'portrait', caption: 'Potret kebersamaan mahasiswa dalam proyek fotografi kegiatan.' },
    { filename: 'fotografi-kegiatan-02.jpg', title: 'Produksi Foto di Ruang Baca', category: 'organisasi', orientation: 'portrait', caption: 'Dokumentasi sesi fotografi dan kolaborasi di lingkungan kampus.' },
    { filename: 'fotografi-kegiatan-03.jpg', title: 'Potret Tim Kegiatan', category: 'organisasi', orientation: 'portrait', caption: 'Potret anggota tim dalam dokumentasi kegiatan dan organisasi.' },
    { filename: 'fotografi-kegiatan-04.jpg', title: 'Kolaborasi dan Dokumentasi Kampus', category: 'organisasi', orientation: 'portrait', caption: 'Momen diskusi dan kolaborasi mahasiswa yang didokumentasikan untuk portofolio.' },
    { filename: 'video-konten-01.jpg', title: 'Video Edukasi Digital', category: 'lainnya', orientation: 'portrait', caption: 'Cuplikan video edukasi singkat untuk konten media sosial.' },
    { filename: 'video-konten-02.jpg', title: 'Produksi Konten Kreator', category: 'lainnya', orientation: 'portrait', caption: 'Proses pembuatan konten video vertikal untuk kanal digital.' },
    { filename: 'video-konten-03.jpg', title: 'Video Edukatif dan Storytelling', category: 'lainnya', orientation: 'portrait', caption: 'Cuplikan konten informatif dengan penyampaian singkat dan visual.' },
    { filename: 'video-konten-04.jpg', title: 'Dokumentasi Video Organisasi', category: 'organisasi', orientation: 'portrait', caption: 'Cuplikan video dokumentasi kegiatan dan publikasi organisasi kampus.' },
    { filename: 'video-konten-05.jpg', title: 'Konten Hiburan Mahasiswa', category: 'lainnya', orientation: 'portrait', caption: 'Konten ringan bertema kehidupan mahasiswa untuk media sosial.' },
    { filename: 'media-sosial-01.jpg', title: 'TikTok @architadesia', category: 'lainnya', orientation: 'portrait', caption: 'Akun edukasi yang membahas pendidikan dan bisnis digital.' },
    { filename: 'media-sosial-02.jpg', title: 'Instagram BEM ITBJ', category: 'organisasi', orientation: 'portrait', caption: 'Akun organisasi untuk publikasi program, informasi, dan dokumentasi kegiatan kampus.' },
    { filename: 'media-sosial-03.jpg', title: 'TikTok @anak.debe', category: 'lainnya', orientation: 'portrait', caption: 'Akun hiburan kolaboratif yang mengangkat ide kreatif dan tren mahasiswa.' },
    { filename: 'media-organisasi-01.jpg', title: 'Publikasi JBS News', category: 'organisasi', caption: 'Materi publikasi informasi kampus untuk kanal media sosial.' },
    { filename: 'media-organisasi-02.jpg', title: 'Konten Edukasi Isu Publik', category: 'organisasi', caption: 'Visual informatif yang mengangkat isu publik dalam format media sosial.' },
    { filename: 'media-organisasi-03.jpg', title: 'Apresiasi Donatur BEM ITBJ', category: 'organisasi', orientation: 'portrait', caption: 'Publikasi ucapan terima kasih kepada donatur dalam kegiatan sosial BEM.' },
    { filename: 'media-organisasi-04.jpg', title: 'Publikasi Kegiatan BEM', category: 'organisasi', orientation: 'portrait', caption: 'Desain publikasi dan dokumentasi aktivitas kabinet BEM ITBJ.' }
  ];
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryEmpty = document.getElementById('galleryEmpty');
  const filterButtons = document.querySelectorAll('.gallery-filters [data-filter]');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxButton = document.getElementById('lightboxClose');
  const themeToggle = document.getElementById('themeToggle');
  const mobileMenuButton = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  let activeFilter = 'all';
  let previousFocus = null;

  function getTitle(filename) {
    return filename
      .replace(/\.[^.]+$/, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, character => character.toUpperCase());
  }

  function renderGallery() {
    const visibleItems = galleryItems.filter(item => activeFilter === 'all' || item.category === activeFilter);
    galleryGrid.replaceChildren();
    galleryEmpty.hidden = galleryItems.length > 0;

    visibleItems.forEach(item => {
      const title = item.title || getTitle(item.filename);
      const card = document.createElement('article');
      card.className = 'gallery-card';
      if (item.orientation === 'portrait') card.classList.add('gallery-card--portrait');

      const imageButton = document.createElement('button');
      imageButton.className = 'gallery-image-button';
      imageButton.type = 'button';
      imageButton.setAttribute('aria-label', `Perbesar foto ${title}`);

      const image = document.createElement('img');
      image.src = `assets/galeri/${item.filename}`;
      image.alt = title;
      image.loading = 'lazy';
      imageButton.append(image);
      imageButton.addEventListener('click', () => openLightbox(item, title));

      const content = document.createElement('div');
      content.className = 'gallery-card-content';
      const category = document.createElement('span');
      category.className = 'gallery-category';
      category.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
      const heading = document.createElement('h2');
      heading.className = 'gallery-card-title';
      heading.textContent = title;
      const caption = document.createElement('p');
      caption.className = 'gallery-card-caption';
      caption.textContent = item.caption;
      content.append(category, heading, caption);
      card.append(imageButton, content);
      galleryGrid.append(card);
    });

    if (galleryItems.length > 0 && visibleItems.length === 0) {
      const emptyFilter = document.createElement('p');
      emptyFilter.className = 'gallery-empty';
      emptyFilter.textContent = 'Belum ada foto untuk kategori ini.';
      galleryGrid.append(emptyFilter);
    }
  }

  function openLightbox(item, title) {
    previousFocus = document.activeElement;
    lightboxImage.src = `assets/galeri/${item.filename}`;
    lightboxImage.alt = title;
    lightboxCaption.textContent = `${title}. ${item.caption}`;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeLightboxButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.style.overflow = '';
    previousFocus?.focus();
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach(filterButton => {
        const isActive = filterButton === button;
        filterButton.classList.toggle('active', isActive);
        filterButton.setAttribute('aria-pressed', String(isActive));
      });
      renderGallery();
    });
  });

  closeLightboxButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  if (themeToggle) {
    const savedTheme = localStorage.getItem('anis_cv_theme');
    if (savedTheme === 'dark') document.body.classList.replace('light-mode', 'dark-mode');
    if (savedTheme === 'light') document.body.classList.replace('dark-mode', 'light-mode');
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      document.body.classList.toggle('light-mode', !isDark);
      localStorage.setItem('anis_cv_theme', isDark ? 'dark' : 'light');
    });
  }

  if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  renderGallery();
});