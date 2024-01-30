import { Component, HostListener, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private navbar: HTMLElement | null = null;
  private cart: HTMLElement | null = null;
  private navbarNav: HTMLElement | null = null;
  private headerMenu: HTMLElement | null = null;
  private sticky: number = 0;

  ngOnInit() {
    this.headerMenu = document.getElementById("header-menu");
    this.navbar = document.getElementById("navbar");
    this.cart = document.getElementById("cart-bottom");
    this.navbarNav = document.getElementById("navbarNav");

    if (this.navbar) {
      this.sticky = this.navbar.offsetTop - 20;
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.myFunction();
  }

  private myFunction() {
    if (this.cart && this.navbar && this.navbarNav && window.scrollY >= this.sticky) {
      this.navbar.classList.add("sticky");
      this.cart.classList.add("d-lg-block");
      this.navbarNav.classList.remove("justify-content-center");
    } else if (this.cart && this.navbar && this.navbarNav) {
      this.navbarNav.classList.add("justify-content-center");
      this.navbar.classList.remove("sticky");
      this.cart.classList.remove("d-lg-block");
    }
  }
}
