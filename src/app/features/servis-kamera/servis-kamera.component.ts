import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
	selector: 'app-servis-kamera',
	templateUrl: './servis-kamera.component.html',
	styleUrls: ['./servis-kamera.component.scss']
})
export class ServisKameraComponent extends MetaDataService implements OnInit {
	model: any = {};
	is: any = {};
    error: any = {};
	base64Image: string | null = null;

	constructor(
		private globalService: GlobalService,
        titleService: Title,
        metaService: Meta
	) {
        super(titleService, metaService);
    }

	ngOnInit(): void {
        this.updateTags('Servis Kamera', 'service');
		this.empty();
	}

	empty() {
		this.model = {
			name: '',
			email: '',
			phone_code: '+62',
			phone_number: '',
		}
		this.is = {
			success: false,
		}
		// this.model.file = "assets/img/elements/18.jpg";
        this.error = {};
	}

	kirim() {
		let param = Object.assign(this.model);
		this.globalService.DataPost('/public/servis', param).subscribe((res: any) => {
			if (res.status_code == 200) {
				this.is.success = true;
				this.empty();
			}
        }, (error: any) => {
            this.error.name = error.error.errors.name;
            this.error.email = error.error.errors.email;
            this.error.phone_number = error.error.errors.phone_number;
            this.error.keterangan = error.error.errors.keterangan;
        });
	}

	onFileSelected(event: any) {
		const selectedFile = <File>event.target.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			this.base64Image = reader.result as string;
		};
		reader.readAsDataURL(selectedFile);
	}
}
