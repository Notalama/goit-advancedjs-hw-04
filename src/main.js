import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import {
  showLoader,
  hideLoader,
  clearGallery,
  renderGallery,
} from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let lightbox = new SimpleLightbox('.gallery .gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let currentSearchQuery = '';

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function fetchAndRenderImages(searchQuery, page, append = false) {
  loadMoreBtn.classList.add('is-hidden');
  showLoader();

  try {
    if (!append) {
      clearGallery();
    }

    const data = await fetchImages(searchQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();

    if (append) {
      const { height: cardHeight } = document
        .querySelector('.gallery-item')
        .getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (data.totalHits > page * 15) {
      loadMoreBtn.classList.remove('is-hidden');
    } else if (append) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    return data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const searchQuery = form.elements.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  currentSearchQuery = searchQuery;

  await fetchAndRenderImages(searchQuery, currentPage);
  form.reset();
}

async function handleLoadMore() {
  currentPage += 1;
  await fetchAndRenderImages(currentSearchQuery, currentPage, true);
}
