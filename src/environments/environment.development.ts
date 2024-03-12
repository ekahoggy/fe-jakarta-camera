let apiURL = 'https://jakartacamera-admin.moodstudio.id/api/v1';
let originalImageURL = 'https://jakartacamera-admin.moodstudio.id/img/media/originals/';
let productImageURL = 'https://jakartacamera-admin.moodstudio.id/img/media/product/';

if (window.location.hostname == 'localhost') {
  apiURL = 'http://localhost:8000/api/v1';
  originalImageURL = 'http://localhost:8000/img/media/originals/';
  productImageURL = 'http://localhost:8000/img/media/product/';
}

export const environment = {
  apiURL: apiURL,
  originalImageURL: originalImageURL,
  productImageURL: productImageURL,

  version: 1.0
};
