import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  apiURL: string = '';
  imageURL: string = '';
  httpOptions: any;

  constructor(
    private http: HttpClient,
  ) { }

  getImage(folder: string, image: string) {
    let ret;

    if (image !== '' && image !== null && folder !== '') {
      ret = this.imageURL + folder + '/' + image;
    } else if (image !== '' && image !== null && folder === '') {
      ret = this.imageURL + image;
    } else {
      ret = this.imageURL + 'default.png';
    }
    return ret;
  }

  DataGet(path: string, payloads = {}) {
    return this.http.get(this.apiURL + path, {
      params: payloads,
      withCredentials: true,
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
}
