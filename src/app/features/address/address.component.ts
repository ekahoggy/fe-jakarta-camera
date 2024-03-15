import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  model:any = {};
  listData: any = [];
  isForm: boolean = false;
  isEdit: boolean = false;
  pageTitle: string = 'My Address';
  listVillage: any = [];
  listSubdistrict: any = [];
  listCity: any = [];
  listProvince: any = [];
 
  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    this.empty();
    this.getData();
    this.getProvince();
  }

  empty() {
  }

  getData() {
    this.globalService.DataGet('/address/get', {}).subscribe((res:any) => {
      this.listData = res.data;
    });
  }

  index() {
    this.pageTitle = 'My Address';
    this.isForm = false;
    this.isEdit = false;
  }

  create() {
    this.pageTitle = 'Create Address';
    this.isForm = true;
    this.isEdit = false;
    this.model = {};
    this.model.phone_code =  '+62';
  }

  edit(val:any) {
    this.pageTitle = 'Edit Address';
    this.isForm = true;
    this.isEdit = true;
    this.model = val;
    this.getProvince();
    this.getCity(val.province_id);
    this.getSubdistrict(val.city_id);
    this.getVillage(val.subdistrict_id);
  }

  save() {
    let final = Object.assign(this.model);
    this.globalService.DataPost('/address/save', final).subscribe((res:any) => {
      this.listVillage = res.data;
      this.globalService.alertSuccess('Success', res.message)
      this.index();
    })
  }

  getProvince() {
    this.globalService.DataGet('/region/province', {}).subscribe((res:any) => {
      this.listProvince = res.data;
    })
  }

  getCity(provinsi_id:any = null) {
    this.globalService.DataGet('/region/city', { provinsi_id: provinsi_id }).subscribe((res:any) => {
      this.listCity = res.data;
    })
  }

  getSubdistrict(kota_id:any = null) {
    this.globalService.DataGet('/region/subdistrict', { kota_id: kota_id }).subscribe((res:any) => {
      this.listSubdistrict = res.data;
    })
  }

  getVillage(kecamatan_id:any = null) {
    this.globalService.DataGet('/region/village', { kecamatan_id: kecamatan_id }).subscribe((res:any) => {
      this.listVillage = res.data;
    })
  }

  resetProvince() {
    this.model.city = null;
    this.model.subdistrict = null;
    this.model.village = null;
  }

  resetCity() {
    this.model.subdistrict = null;
    this.model.village = null;
  }

  resetSubdistrict() {
    this.model.village = null;
  }
}