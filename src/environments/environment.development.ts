let url = 'https://jakartacamera.moodstudio.id/'
let apiURL = 'https://apijakartacamera.moodstudio.id/api/v1';
let originalImageURL = 'https://apijakartacamera.moodstudio.id/img/media/originals/';
let productImageURL = 'https://apijakartacamera.moodstudio.id/img/media/product/';

if (window.location.hostname == 'localhost') {
  url = 'http://localhost:3200/'
  apiURL = 'http://localhost:8000/api/v1';
  originalImageURL = 'http://localhost:8000/img/media/originals/';
  productImageURL = 'http://localhost:8000/img/media/product/';
}

export const environment = {
  url: url,
  apiURL: apiURL,
  originalImageURL: originalImageURL,
  productImageURL: productImageURL,

  version: 1.0
};
