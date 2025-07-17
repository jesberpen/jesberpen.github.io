// CATEGORY FILTER SETUP
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryImages = document.querySelectorAll('.gallery-img');

filterButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const category = this.getAttribute('data-category');
    filterButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    galleryImages.forEach(img => {
      if (category === 'all' || img.getAttribute('data-category') === category) {
        img.style.display = '';
      } else {
        img.style.display = 'none';
      }
    });
  });
});

// LIGHTBOX CODE (no changes needed; keep your current implementation)
const images = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIdx = 0;

const imageList = Array.from(images).map(img => ({
    src: img.src, alt: img.alt
}));

function openLightbox(idx) {
    lightbox.style.display = 'block';
    updateLightbox(idx);
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function updateLightbox(idx) {
    currentIdx = idx;
    lightboxImg.src = imageList[idx].src;
    lightboxCaption.textContent = imageList[idx].alt || '';
}

function prevImage() {
    currentIdx = (currentIdx - 1 + imageList.length) % imageList.length;
    updateLightbox(currentIdx);
}

function nextImage() {
    currentIdx = (currentIdx + 1) % imageList.length;
    updateLightbox(currentIdx);
}

images.forEach((img, idx) => {
    img.addEventListener('click', () => openLightbox(idx));
});

closeBtn.onclick = closeLightbox;
prevBtn.onclick = prevImage;
nextBtn.onclick = nextImage;

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeLightbox();
    }
});
