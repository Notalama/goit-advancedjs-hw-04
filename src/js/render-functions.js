export function showLoader() {
  document.querySelector('.loader').classList.remove('is-hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('is-hidden');
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = '';
  }
}

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');

  if (!gallery) return;

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <li class="gallery-item">
        <a href="${largeImageURL}" class="gallery-link">
          <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
          </div>
        </a>
      </li>
    `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
