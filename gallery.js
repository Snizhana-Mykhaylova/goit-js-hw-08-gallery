import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.gallery.js-gallery');
const lightboxRef = document.querySelector('.lightbox');
const btnCloseRef = document.querySelector(
  'button[data-action= "close-lightbox"]',
);
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('div.lightbox__overlay');

// генерит разметку галереи
gallery.map((item, index) => {
  const galleryItemRef = document.createElement('li');
  galleryItemRef.classList.add('gallery__item');

  const galleryLinkRef = document.createElement('a');
  galleryLinkRef.classList.add('gallery__link');
  galleryLinkRef.href = item.original;

  const galleryImageRef = document.createElement('img');
  galleryImageRef.classList.add('gallery__image');
  galleryImageRef.src = item.preview;
  galleryImageRef.setAttribute('data-source', item.original);
  galleryImageRef.setAttribute('data-idx', index);
  galleryImageRef.alt = item.description;

  galleryRef.appendChild(galleryItemRef);
  galleryItemRef.appendChild(galleryLinkRef);
  galleryLinkRef.appendChild(galleryImageRef);
});

// открытие модалки при клике на изображение
galleryRef.addEventListener('click', showOriginalSize);

function showOriginalSize(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = event.target.dataset.source;
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
