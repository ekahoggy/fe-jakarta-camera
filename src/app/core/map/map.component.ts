import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    query: string = '';
    results: any[] = [];
    constructor(private globalService: GlobalService) { }

    ngOnInit(): void {
        this.search()
        // Inisialisasi peta
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Tambahkan tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Tambahkan marker
        L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    }

    search() {
        const params = {
            q: "Jl Puter",
            format: 'json',
            addressdetails: '1',
            limit: '5'
        };
    
        this.globalService.DataApi('https://nominatim.openstreetmap.org/search', { params }).subscribe((data: any) => {
            this.results = data;
        });
      }


}