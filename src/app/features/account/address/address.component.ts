import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
    model: any = {};
    listData: any = [];
    isForm: boolean = false;
    isEdit: boolean = false;
    pageTitle: string = 'Alamat Pengiriman';
    listVillage: any = [];
    listSubdistrict: any = [];
    listCity: any = [];
    listProvince: any = [];
    auth: any;

    constructor(
        private globalService: GlobalService,
    ) { }

    ngOnInit(): void {
        this.auth = this.globalService.getAuth()["user"];
        this.empty();
        this.getData();
        this.getProvince();
    }

    empty() {
        this.model = {};
     }

    getData() {
        this.globalService.DataGet('/address/get', { user_id: this.auth['id'] }).subscribe((res: any) => {
            this.listData = res.data;
        });
    }

    index() {
        this.pageTitle = 'Alamat Pengiriman';
        this.isForm = false;
        this.isEdit = false;
        this.getData();
    }

    create() {
        this.pageTitle = 'Create Address';
        this.isForm = true;
        this.isEdit = false;
        this.model = {};
        this.model.phone_code = '+62';
        this.model.user_id = this.auth['id'];
    }

    edit(id: any) {
        this.pageTitle = 'Edit Address';
        this.isForm = true;
        this.isEdit = true;
        this.getById(id);
    }

    getById(id: any) {
        this.globalService.DataGet('/address/edit', { id: id }).subscribe((res: any) => {
            this.model = res.data;
            this.getProvince();
            this.getCity(this.model.province_id);
            this.getSubdistrict(this.model.city_id);
            this.getVillage(this.model.subdistrict_id);
        });
    }

    save() {
        let final = Object.assign(this.model);
        this.globalService.DataPost('/address/save', final).subscribe((res: any) => {
            this.listVillage = res.data;
            this.globalService.alertSuccess('Success', res.message)
            this.index();
        }, (error: any) => {
            this.globalService.alertError('Sorry', error.error.message);
        });
    }

    delete(id: any) {
        Swal.fire({
            title: "Are you sure you want to delete this address?",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            confirmButtonColor: "#dc3545",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) {
                this.globalService.DataPost('/address/delete', { id: id }).subscribe((res: any) => {
                    this.globalService.alertSuccess('Success', 'your address has been deleted')
                    this.getData();
                });
            }
        });
    }

    getProvince() {
        this.globalService.DataGet('/region/province', {}).subscribe((res: any) => {
            this.listProvince = res.data;
        })
    }

    getCity(provinsi_id: any = null) {
        this.globalService.DataGet('/region/city', { provinsi_id: provinsi_id }).subscribe((res: any) => {
            this.listCity = res.data;
        })
    }

    getSubdistrict(kota_id: any = null) {
        this.globalService.DataGet('/region/subdistrict', { kota_id: kota_id }).subscribe((res: any) => {
            this.listSubdistrict = res.data;
        })
    }

    getVillage(kecamatan_id: any = null) {
        this.globalService.DataGet('/region/village', { kecamatan_id: kecamatan_id }).subscribe((res: any) => {
            this.listVillage = res.data;
        })
    }

    resetProvince() {
        this.model.city_id = null;
        this.model.subdistrict_id = null;
        this.model.village_id = null;
    }

    resetCity() {
        this.model.subdistrict_id = null;
        this.model.village_id = null;
    }

    resetSubdistrict() {
        this.model.village_id = null;
    }

    changeActive(id: any) {
        Swal.fire({
            title: "Are you sure you want to activated this address?",
            showCancelButton: true,
            confirmButtonText: "Yes, activated",
            confirmButtonColor: "#33b035",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) {
                this.globalService.DataPost('/address/update', { id: id }).subscribe((res: any) => {
                    this.globalService.alertSuccess('Success', 'Successfuly to change active address');
                    this.getData();
                })
            }
        });
    }

    setKoordinat(event) {
        this.model.latitude = event.lat;
        this.model.longitude = event.long;
    }

}