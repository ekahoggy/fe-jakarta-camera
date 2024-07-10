import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  model: any = [];
  detail: any = [];
  listCategory: any = [];
  introVideo: any;
  loadingPage: boolean = true;
  play: boolean = false;
  activeTab: string = 'deskripsi';
  dataDetailClick: any = {
    title: '',
    url_video: '',
  };

  constructor(
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.getDataBySlug(slug);
    });
  }

  getDataBySlug(slug) {
    this.loadingPage = true;
    this.globalService.DataGet(`/public/edukasi/${slug}`).subscribe((res: any) => {
      this.model = res.data;
      this.detail = res.detail;
      this.introVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.model.mainVideo);
    })
  }

  clickVideo(item) {
    if(item.is_lock === 0){
      this.dataDetailClick.title = item.title;
      this.dataDetailClick.url_video = this.sanitizer.bypassSecurityTrustResourceUrl(item.url_video);;
    }
  }

  openModal(modal: TemplateRef<any>, item) {
    if (item.is_lock === 1) {
      this.alertSubscribe()
    }
    else {
      this.clickVideo(item);
      this.modalService.open(modal, { size: 'xl', backdrop: 'static' });
    }
  }

  toSubscribe(){
    this.router.navigate([`/education/checkout/`+this.model.slug]);
  }

  alertSubscribe() {
    this.globalService.alertQuestion("Anda belum berlangganan", "Untuk mengakses konten edukasi ini, Anda harus berlangganan terlebih dahulu.", 3000);
  }

  openModalSubscribe(modal: TemplateRef<any>) {
    this.modalService.open(modal, { size: 'md', backdrop: 'static' });
  }
}
