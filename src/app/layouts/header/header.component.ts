import { Component, HostListener, OnInit, TemplateRef, inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
	private navbar: HTMLElement | null = null;
	private cart: HTMLElement | null = null;
	private navbarNav: HTMLElement | null = null;
	private headerMenu: HTMLElement | null = null;
	private sticky: number = 0;
	private offcanvasService = inject(NgbOffcanvas);
	collapseCollection: boolean = true;
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

	constructor(
		private globalService: GlobalService,
		private router: Router,
        private modalService: NgbModal
	) { }

	ngOnInit() : void {
		this.auth = this.globalService.getAuth()['user'];
		this.headerMenu = document.getElementById("header-menu");
		this.navbar = document.getElementById("navbar");
		this.cart = document.getElementById("cart-bottom");
		this.navbarNav = document.getElementById("navbarNav");
		if (this.navbar) {
			this.sticky = this.navbar.offsetTop - 20;
		}

		this.getCategories();
		this.totalCart();
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

    openAuth(modal:TemplateRef<any>) {
        this.modalService.open(modal, { size: 'xl', backdrop: 'static'});
        this.emptyRegis();
    }

    activePage(page:string) {
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
        this.globalService.DataPost('/auth/login', param).subscribe((res:any) => {
            if (res.status_code == 200) {
                const userData = btoa(JSON.stringify(res.data))
                localStorage.setItem('session', userData)
                window.location.href = '/home';
            }
        }, (error:any) => {
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
        this.globalService.DataPost('/auth/register', param).subscribe((res:any) => {
            if (res.status == 'success') {
                this.is.success = true;
                this.emptyRegis();
            }
            }, (error:any) => {
            this.error.email = error.error.errors.email;
            this.error.name = error.error.errors.name;
            this.error.phone_number = error.error.errors.phone_number;
        });
    }
}
