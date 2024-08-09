import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pasang-cctv',
  templateUrl: './pasang-cctv.component.html',
  styleUrls: ['./pasang-cctv.component.scss']
})
export class PasangCctvComponent extends MetaDataService implements OnInit {
  	model: any = {};
	is: any = {};
	error: any = {};
	base64Image: string | null = null;
	listProvince: any = [];
	listCity: any = [];
	listSubdistrict: any = [];
	listVillage: any = [];

	constructor(
		private globalService: GlobalService,
        titleService: Title,
        metaService: Meta
	) {
        super(titleService, metaService);
    }

	ngOnInit(): void {
        this.updateTags('Pasang CCTV', 'service/pasang-cctv');
		this.empty();
		this.getProvince();
	}

	empty() {
		this.model.phone_code = '+62';
		this.is = {
			success: false,
            laoding: false
		}
		this.model.icon = "assets/img/elements/18.jpg";
	}

	register() {
		let param = Object.assign(this.model);
		this.globalService.DataPost('/public/register', param).subscribe((res: any) => {
			if (res.status_code == 200) {
				this.is.success = true;
				this.empty();
			}
		})
	}

	onFileSelected(event: any) {
		const selectedFile = <File>event.target.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			this.base64Image = reader.result as string;
		};
		reader.readAsDataURL(selectedFile);
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

	setKoordinat(event) {
        this.model.latitude = event.lat;
        this.model.longitude = event.long;
    }

	kirim() {
        this.is.loading = true;
		let param = Object.assign(this.model);
		this.globalService.DataPost('/public/pasang-cctv', param).subscribe((res: any) => {
			if (res.status_code == 200) {
				this.is.success = true;
                this.is.loading = false;
				this.empty();
			}
        }, (error: any) => {
            this.is.loading = false;
            this.error.nama = error.error.errors.nama;
            this.error.email = error.error.errors.email;
            this.error.phone_number = error.error.errors.phone_number;
            this.error.pesan = error.error.errors.pesan;
            this.error.province_id = error.error.errors.province_id;
            this.error.city_id = error.error.errors.city_id;
            this.error.subdistrict_id = error.error.errors.subdistrict_id;
            this.error.village_id = error.error.errors.village_id;
            this.error.address = error.error.errors.address;
            this.error.postal_code = error.error.errors.postal_code;
            this.error.latitude = error.error.errors.latitude;
        });
	}
}
