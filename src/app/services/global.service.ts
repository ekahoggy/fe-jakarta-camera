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
    dataLocalStorage: any = [];

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
      window.location.href = '/login';
    }

    alertSuccess(title: string, text: string, timer: number = 1500) {
        Swal.fire({ icon: "success", title: title, text: text, timer: timer });
    }

    alertError(title: string, text: any, timer: number = 1500) {
        let message: any = [];

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

    alertQuestion(title: string, text: string, timer: number = 1500) {
        Swal.fire({ icon: "question", title: title, text: text, timer: timer });
    }

    isObject(variable: any) {
        return typeof variable === 'object' && variable !== null;
    }

    clickToViewsNews(item) {
        this.DataPost(`/public/news/view/` + item.id).subscribe((res: any) => {
            this.router.navigate([`/news/` + item.slug]);
        })
    }

    getProductFromLocalStorage() {
        let data = localStorage.getItem('produk');

        if (data) {
            const obj = JSON.parse(data);
            return obj;
        }
        else {
            return [];
        }
    }

    productToLocalStorage(item: any) {
        let data = localStorage.getItem('produk');

        if (data) {
            const obj = JSON.parse(data);
            if (!obj.includes(item.id)) {
                obj.unshift(item.id);
            }
            else {
                const index = obj.indexOf(item.id);
                if (index !== -1) {
                    // Jika 'baru' sudah ada, hapus dari array
                    obj.splice(index, 1);
                }
                // Menambahkan 'baru' ke posisi pertama
                obj.unshift(item.id);
            }

            localStorage.setItem('produk', JSON.stringify(obj));
        }
        else {
            this.dataLocalStorage.push(item.id);
            localStorage.setItem('produk', JSON.stringify(this.dataLocalStorage));
        }
    }

    getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
                resolve({ long: resp.coords.longitude, lat: resp.coords.latitude });
            }, err => {
                reject(err);
            });
        });
    }
}
