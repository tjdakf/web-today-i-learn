const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightbox-img');
const galleryImages = document.querySelectorAll('.gallery-grid img');

let currentIndex = 0;

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.querySelector('#til-date').value;
  const title = document.querySelector('#til-title').value;
  const content = document.querySelector('#til-content').value;

  const article = document.createElement('article');
  article.className = 'til-item';
  article.innerHTML = `
    <time>${date}</time>
    <h3>${title}</h3>
    <p>${content}</p>
  `;

  tilList.prepend(article);
  tilForm.reset();
});

galleryImages.forEach(function(img, index) {
  img.addEventListener('click', function() {
    currentIndex = index;
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

document.querySelector('#lightbox-prev').addEventListener('click', function() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

document.querySelector('#lightbox-next').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

lightbox.addEventListener('click', function(event) {
  if (event.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

document.addEventListener('keydown', function(event) {
  if (!lightbox.classList.contains('active')) return;

  if (event.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
  }
  if (event.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
  }
  if (event.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});
