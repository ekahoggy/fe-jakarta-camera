import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    model: any = {}
    session: any;
    base64Image: string = '';

    constructor(
		private globalService: GlobalService,
	) {}

    ngOnInit(): void {
		this.session = this.globalService.getAuth()['user']; 
        this.getData();
        this.empty();
    }

    empty() {
        this.model = {};
        this.model.photo = "assets/img/avatars/1.png";
    }

    getData() {
        this.globalService.DataGet(`/public/user`, {id: this.session.id}).subscribe((res:any) => {
            this.model = res.data;
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
    
    setImageBase64(image:any) {
        let photo = image;
        if (this.base64Image) {
            photo = {
                base64: this.base64Image
            }
        }
    
        return photo;
    }

    save() {
        this.model.photo = this.setImageBase64(this.model.photo);
        const final = Object.assign(this.model)
        this.globalService.DataPost('/public/user-save', final).subscribe((res: any) => {
            if (res.status_code == 200) {
                this.globalService.alertSuccess('Success', 'Customer saved successfully')
                this.getData();
            }
        })
      }
}
