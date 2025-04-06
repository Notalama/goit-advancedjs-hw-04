const API_KEY = '49351847-475dcb2d908ee06e87d68c158';
const BASE_URL = 'https://pixabay.com/api/';
import axios from 'axios';

export async function fetchImages(searchQuery, page = 1) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `HTTP error! Status: ${error.response?.status || 'Unknown'}`
    );
  }
}
