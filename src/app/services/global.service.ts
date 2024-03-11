import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  apiURL: string = environment.apiURL 
  originalImageURL: string = environment.originalImageURL
  productImageURL: string = environment.productImageURL
  httpOptions: any;

  constructor(
    private http: HttpClient,
  ) { }

  getImage(folder: string, image: string) {
    let ret;

    if (image !== '' && image !== null && folder !== '') {
      ret = this.originalImageURL + folder + '/' + image;
    } else if (image !== '' && image !== null && folder === '') {
      ret = this.originalImageURL + image;
    } else {
      ret = this.originalImageURL + 'default.png';
    }
    return ret;
  }

  getImageProduct(folder: string, image: string) {
    let ret;

    if (image !== '' && image !== null && folder !== '') {
      ret = this.productImageURL + folder + '/' + image;
    } else if (image !== '' && image !== null && folder === '') {
      ret = this.productImageURL + image;
    } else {
      ret = this.productImageURL + 'default.png';
    }
    return ret;
  }

  DataGet(path: string, payloads = {}) {
    return this.http.get(this.apiURL + path, {
      params: payloads,
      withCredentials: true
    });
  }


  DataApi(path: string, payloads = {}) {
    return this.http.get(path);
  }

  /**
   * Request POST
   */
  DataPost(path: string, payloads = {}, isHtml: boolean = false) {
    if (isHtml === true) {
      const reqHeader = {
        responseType: 'text' as 'json',
        withCredentials: true,
      };
      return this.http.post(this.apiURL + path, payloads, reqHeader);
    } else {
      const reqHeader = this.httpOptions;
      return this.http.post(this.apiURL + path, payloads, reqHeader);
    }
  }

  getAuth() {
    let encoded = localStorage.getItem('session');
    if (encoded) {
      return JSON.parse(atob(encoded));
    }

    return null;
  }
}
