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
}
