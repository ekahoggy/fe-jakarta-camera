import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


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
    private router: Router
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

  destroyAuth() {
    localStorage.removeItem('session');
    return this.router.navigate(['login']);
  }

  alertSuccess(title:string, text:string, timer:number = 1500) {
    Swal.fire({ icon: "success", title: title, text: text, timer: timer });
  }

  alertError(title:string, text:any, timer:number = 1500) {
    let message:any = [];

    if (this.isObject(text)) {
      for (let key in text) {
        if (text.hasOwnProperty(key)) {
          message.push(text[key] + '<br>');
        }
      }
      let html = message.join('');
      Swal.fire({ icon: "error", title: title, html: html, timer: 2000 });
    } else {
      Swal.fire({ icon: "error", title: title, text: text, timer: timer });
    }
  }

  alertQuestion(title:string, text:string, timer:number = 1500) {
    Swal.fire({ icon: "question", title: title, text: text, timer: timer });
  }

  isObject(variable:any) {
    return typeof variable === 'object' && variable !== null;
}
}
