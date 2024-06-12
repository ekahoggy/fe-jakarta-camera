import { Component, OnInit } from '@angular/core';
import { MetaDataService } from './services/meta-data.service';
import { Meta, Title } from '@angular/platform-browser';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends MetaDataService implements OnInit{
  title = 'fe-jakarta-kamera';
  routes = routes;
  constructor(
    titleService: Title,
    metaService: Meta
  ) {
    super(titleService, metaService);
  }

  ngOnInit(): void {
    console.log(this.routes);
    this.updateTags('', '', '', '');
  }
}
