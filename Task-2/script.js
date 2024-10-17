// Get all gallery images
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');

// Open lightbox on image click
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;
        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = imgAlt;
        lightbox.style.display = 'flex';
    });
});

// Close lightbox
closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
});

// Close lightbox on outside click
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
