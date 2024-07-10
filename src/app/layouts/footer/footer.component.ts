import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  model: any = {};
  modelTentang: any = {};
  modelMarketplace: any = {};
  year: any;
  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    const d = new Date();
    this.year = d.getFullYear();
    this.getData()
  }

  getData() {
    this.globalService.DataGet("/setting", { kategori: 'A' }).subscribe((res: any) => {
      res.data.forEach((val, k) => {
        if (val.name === 'alamat') {
          this.model.alamat = val.value
        }
        if (val.name === 'kodepos') {
          this.model.kodepos = val.value
        }
        if (val.name === 'no_hp') {
          this.model.no_hp = val.value
        }
        if (val.name === 'no_telp') {
          this.model.no_telp = val.value
        }
        if (val.name === 'email') {
          this.model.email = val.value
        }
        if (val.name === 'hari_kerja') {
          this.model.hari_kerja = val.value
        }
      });
    });

    this.globalService.DataGet("/setting", { kategori: 'F' }).subscribe((res: any) => {
      res.data.forEach((val, k) => {
        if (val.name === 'tentang_kami') {
          this.modelTentang.tentang_kami = val.value
        }
      });
    });

    this.globalService.DataGet("/setting", { kategori: 'M' }).subscribe((res: any) => {
      res.data.forEach((val, k) => {
        if (val.name === 'bukalapak') {
          this.modelMarketplace.bukalapak = val.value
        }
        if (val.name === 'shopee') {
          this.modelMarketplace.shopee = val.value
        }
        if (val.name === 'tokopedia') {
          this.modelMarketplace.tokopedia = val.value
        }
        if (val.name === 'blibli') {
          this.modelMarketplace.blibli = val.value
        }
      });
    });
  }
}
