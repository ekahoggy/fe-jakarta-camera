let url = 'https://dev.jakartacamera.com/'
let apiURL = 'https://apidev.jakartacamera.com/api/v1';
let api = 'https://apidev.jakartacamera.com';
let originalImageURL = 'https://apidev.jakartacamera.com/img/media/originals/';
let productImageURL = 'https://apidev.jakartacamera.com/img/media/product/';
let googleIdClient = '1076513397291-ic5p0c2ohngbn3fa0159d2tej9s6qkco.apps.googleusercontent.com';

if (window.location.hostname == 'localhost') {
  url = 'http://localhost:3200/'
  api = 'http://localhost:8000';
  apiURL = 'http://localhost:8000/api/v1';
  originalImageURL = 'http://localhost:8000/img/media/originals/';
  productImageURL = 'http://localhost:8000/img/media/product/';
}

if (window.location.hostname == 'moodstudio.id') {
  url = 'https://jakartacamera.moodstudio.id/'
  api = 'https://apijakartacamera.moodstudio.id';
  apiURL = 'https://apijakartacamera.moodstudio.id/api/v1';
  originalImageURL = 'https://apijakartacamera.moodstudio.id/img/media/originals/';
  productImageURL = 'https://apijakartacamera.moodstudio.id/img/media/product/';
}

export const environment = {
  url: url,
  api: api,
  apiURL: apiURL,
  googleIdClient: googleIdClient,
  originalImageURL: originalImageURL,
  productImageURL: productImageURL,

  version: 1.0
};
