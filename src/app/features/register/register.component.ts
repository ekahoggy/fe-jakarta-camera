import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  is: any = {};

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    this.empty();
  }

  empty() {
    this.model = {
      name: '',
      username: '',
      email: '',
      password: '',
      phone_code: '+62',
      phone_number: '',
    }
    this.is = {
      success: false,
    }
  }

  register() {
    let param = Object.assign(this.model);
    this.globalService.DataPost('/public/register', param).subscribe((res:any) => {
      if (res.status_code == 200) {
        this.is.success = true;
      }
    })
  }
}
