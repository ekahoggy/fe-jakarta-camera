import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pasang-cctv',
  templateUrl: './pasang-cctv.component.html',
  styleUrls: ['./pasang-cctv.component.scss']
})
export class PasangCctvComponent {
  	model: any = {};
	is: any = {};
	base64Image: string | null = null;

	constructor(
		private globalService: GlobalService,
	) { }

	ngOnInit(): void {
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
