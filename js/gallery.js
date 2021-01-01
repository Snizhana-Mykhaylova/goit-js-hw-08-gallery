import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.gallery.js-gallery');
const lightboxRef = document.querySelector('.lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('div.lightbox__overlay');
const btnCloseRef = document.querySelector(
  'button[data-action= "close-lightbox"]',
);
let activIndex = 0;

// генерит разметку галереи
// gallery.map((item, index) => {
//   const galleryItemRef = document.createElement('li');
//   const galleryLinkRef = document.createElement('a');
//   const galleryImageRef = document.createElement('img');

//   galleryItemRef.classList.add('gallery__item');
//   galleryLinkRef.classList.add('gallery__link');
//   galleryImageRef.classList.add('gallery__image');

//   galleryLinkRef.href = item.original;
//   galleryImageRef.src = item.preview;
//   galleryImageRef.alt = item.description;

//   galleryImageRef.setAttribute('data-source', item.original);
//   galleryImageRef.setAttribute('data-idx', index);

//   galleryRef.appendChild(galleryItemRef);
//   galleryItemRef.appendChild(galleryLinkRef);
//   galleryLinkRef.appendChild(galleryImageRef);
// });

gallery.map((item, index) => {
  galleryRef.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery__item">
    <a class="gallery__link" src = "${item.original}">
    <img class = "gallery__image" src = "${item.original}" alt = "${item.description}" data-source = "${item.original}" data-idx = "${index}"/>
    </a>
    </li>`,
  );
});

// открытие модалки при клике на изображение
galleryRef.addEventListener('click', showOriginalSize);

function showOriginalSize(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const activImage = event.target.dataset;
  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = activImage.source;
  activIndex = activImage.idx;
}

// функция закрытия модалки
function closeModal() {
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
}

//  при клике на кнопку
btnCloseRef.addEventListener('click', closeModal);

// при клике на div.lightbox__overlay

lightboxOverlayRef.addEventListener('click', closeModal);

// при нажатии scp
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо"
window.addEventListener('keydown', ArrowLeft);

window.addEventListener('keydown', ArrowRight);

function ArrowLeft(event) {
  if (event.key === 'ArrowLeft') {
    if (activIndex > 0 && activIndex <= gallery.length - 1) {
      activIndex = Number(activIndex) - 1;
      lightboxImageRef.src = gallery[activIndex].original;
    }
    return;
  }
}

function ArrowRight(event) {
  if (event.key === 'ArrowRight') {
    if (activIndex >= 0 && activIndex < gallery.length - 1) {
      activIndex = Number(activIndex) + 1;
      lightboxImageRef.src = gallery[activIndex].original;
    }
    return;
  }
}
