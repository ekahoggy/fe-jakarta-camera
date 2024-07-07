import { Component, HostListener, OnInit, TemplateRef, inject, AfterViewInit } from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private searchSubject: Subject<string> = new Subject();
  private navbar: HTMLElement | null = null;
  private cart: HTMLElement | null = null;
  private navbarNav: HTMLElement | null = null;
  private headerMenu: HTMLElement | null = null;
  private sticky: number = 0;
  private offcanvasService = inject(NgbOffcanvas);
  collapseService: boolean = true;
  collapseProduct: boolean = true;
  listCategories: any;
  auth: any;
  countCart: any;
  model: any = {};
  isError: boolean = false;
  isPesan: string = "";
  activeTabs: string = "login";
  is: any = {};
  error: any = {};
  filter: any = {};
  listResult: any = [];
  loading: boolean = false;
  boxSearch: boolean = false;
  socialUser!: SocialUser;
  isLoggedin?: boolean;

  modelSocialMedia: any= {};
  linkWa: any;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private modalService: NgbModal,
    private socialAuthService: SocialAuthService
  ) {
    this.searchSubject.pipe(debounceTime(1000)).subscribe(searchText => {
      this.filterProduct(searchText);
    });
  }

  ngOnInit(): void {
    let serviceAuth = this.globalService.getAuth();
    this.headerMenu = document.getElementById("header-menu");
    this.navbar = document.getElementById("navbar");
    this.cart = document.getElementById("cart-bottom");
    this.navbarNav = document.getElementById("navbarNav");
    if (this.navbar) {
      this.sticky = this.navbar.offsetTop - 20;
    }
    this.getSocialMedia();
    this.getCategories();

    if (serviceAuth == null) {
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
        let param = Object.assign(this.socialUser);
        this.globalService.DataPost('/auth/loginGoogle', param).subscribe((res: any) => {
          if (res.status_code == 200) {
            const userData = btoa(JSON.stringify(res.data))
            localStorage.setItem('session', userData)
            window.location.href = '/home';
          }
        }, (error: any) => {
          this.isError = true;
          this.isPesan = 'Email or password is wrong!';
        });
      });
    }
    else {
      this.auth = serviceAuth["user"];
      this.totalCart();
    }
  }

  ngAfterViewInit(): void {

  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.myFunction();
  }

  private myFunction() {
    if (this.cart && this.navbar && this.navbarNav && window.scrollY >= this.sticky) {
      this.navbar.classList.add("sticky");
      this.cart.classList.add("d-lg-block");
      // this.navbarNav.classList.remove("justify-content-center");
    } else if (this.cart && this.navbar && this.navbarNav) {
      // this.navbarNav.classList.add("justify-content-center");
      this.navbar.classList.remove("sticky");
      this.cart.classList.remove("d-lg-block");
    }
  }

  openScroll(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { scroll: true });
  }

  getCategories() {
    this.globalService.DataGet('/public/kategori', {}).subscribe((res: any) => {
      this.listCategories = res.data;
    })
  }

  redirectCart() {
    this.router.navigate(['account']);
  }

  totalCart() {
    let params = {
      'user_id': this.auth.id
    }
    this.globalService.DataGet('/cart/get', params).subscribe((res: any) => {
      this.countCart = res.data.length;
    });
  }

  openAuth(modal: TemplateRef<any>) {
    this.modalService.open(modal, { size: 'xl', backdrop: 'static' });
    this.emptyRegis();
  }

  activePage(page: string) {
    this.activeTabs = page;
    this.emptyLogin();
  }

  emptyLogin() {
    this.model = {
      email: '',
      password: ''
    }
  }

  login() {
    let param = Object.assign(this.model);
    this.globalService.DataPost('/auth/login', param).subscribe((res: any) => {
      if (res.status_code == 200) {
        const userData = btoa(JSON.stringify(res.data))
        localStorage.setItem('session', userData)
        window.location.href = '/home';
      }
    }, (error: any) => {
      this.isError = true;
      this.isPesan = 'Email or password is wrong!';
    });
  }

  emptyRegis() {
    this.model = {
      name: '',
      username: '',
      email: '',
      password: '',
      phone_code: '+62',
      phone_number: '',
    }
    this.error = {};
  }

  register() {
    let param = Object.assign(this.model);
    this.globalService.DataPost('/auth/register', param).subscribe((res: any) => {
      if (res.status == 'success') {
        this.is.success = true;
        this.emptyRegis();
      }
    }, (error: any) => {
      this.error.email = error.error.errors.email;
      this.error.name = error.error.errors.name;
      this.error.phone_number = error.error.errors.phone_number;
    });
  }

  onKeyup(event: any) {
    this.loading = true;
    const input = event.target.value;
    const lettersAndNumbers = /^[a-zA-Z0-9]*$/;
    const isValid = lettersAndNumbers.test(input);
    if (isValid) {
      this.searchSubject.next(input);
    } else {
      this.loading = false;  // Reset loading if input is invalid
    }
  }

  filterProduct(event: any) {
    const params = {
      filter: JSON.stringify({ nama: event })
    };
    this.globalService.DataGet('/public/katalog', params).subscribe((res: any) => {
      this.listResult = res.data.list;
      this.loading = false;
    })
  }

  onBlur() {
    setTimeout(() => {
      this.boxSearch = false;
    }, 200); // Delay to allow click event on box-filter
  }

  getSocialMedia() {
    this.globalService.DataGet("/setting", { kategori: 'M' }).subscribe((res: any) => {
      res.data.forEach((val, k) => {
        if (val.name === 'instagram') {
          this.modelSocialMedia.instagram = val.value
        }
        if (val.name === 'tiktok') {
          this.modelSocialMedia.tiktok = val.value
        }
        if (val.name === 'youtube') {
          this.modelSocialMedia.youtube = val.value
        }
      });
    });
    this.globalService.DataGet("/setting", { kategori: 'A' }).subscribe((res: any) => {
      res.data.forEach((val, k) => {
        if (val.name === 'no_hp') {
          this.modelSocialMedia.no_hp = val.value
          if (this.modelSocialMedia.no_hp.startsWith('0')) {
            // Ganti angka pertama '0' dengan '+62'
            this.modelSocialMedia.no_hp = '+62' + this.modelSocialMedia.no_hp.slice(1);
          }
          this.linkWa = `https://api.whatsapp.com/send?phone=${this.modelSocialMedia.no_hp}&text=Halo+Jakarta+Camera`
        }
      });
    });
  }
}
