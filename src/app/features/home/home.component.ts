import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private navbar: HTMLElement | null = null;
  private sticky: number = 0;
  carousel: HTMLElement | null = null;

  ngOnInit() {
    this.navbar = document.getElementById("navbar");
    this.carousel = document.getElementById("banner-carousel");
    if (this.navbar) {
      this.sticky = this.navbar.offsetTop - 20;
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.myFunction();
  }

  private myFunction() {
    if (this.carousel && window.scrollY >= this.sticky) {
      this.carousel.classList.add("content-up");
    } else if (this.carousel) {
      this.carousel.classList.remove("content-up");
    }
  }

  onSwiper(swiper:any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
