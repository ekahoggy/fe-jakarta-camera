import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { icon, latLng, Map, point, marker, polyline, tileLayer } from 'leaflet';
import { GoogleMap } from '@angular/google-maps';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @ViewChild('mapSearchField') searchField: ElementRef | any;
    @ViewChild(GoogleMap) googleMap: GoogleMap | any;
    @Input() search = true;
    @Input() geocoding = false;
    @Input() lat: any;
    @Input() long: any;
    @Input() isViewParent: any;
    @Input() style = false;
    @Output() koordinat = new EventEmitter<string>();

    isView;
    layersControl:any = {
        baseLayers: {
            'Street Maps': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
                {
                    detectRetina: true,
                    attribution: '<a href="https://jakartacamera.com/">Jakarta Camera</a>',
                }
            ),
            'Wikimedia Maps': tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
                detectRetina: true,
                attribution: '<a href="https://jakartacamera.com/">Jakarta Camera</a>',
            })
        },
    };
    marker;
    mapOptions;
    map: Map;
    model;
    text;
    listSearch;
    leafletPosition = { lat: 0, lng: 0 };
    /**
     * End Open Street Map
     */

    constructor(
        private globalService: GlobalService
    ) {}

    ngOnInit(): void {
        this.mapOptions = {
            layers: [
                tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        detectRetina: true,
                        attribution: '<a href="https://jakartacamera.com/">Jakarta Camera</a>',
                    }
                ),
            ],
            zoom: 32,
        };
        this.model = {
            search: null,
            lat: '',
            long: '',
        };
        if (this.lat === undefined && this.long === undefined) {
            navigator.geolocation.getCurrentPosition(
                (success) => {
                    this.leafletPosition.lat = success.coords.latitude;
                    this.leafletPosition.lng = success.coords.longitude;
                    this.map.setView(
                        latLng([
                            success.coords.latitude,
                            success.coords.longitude,
                        ])
                    );
                    this.setLoc(
                        success.coords.latitude,
                        success.coords.longitude,
                        12
                    );
                },
                (error) => {
                    const lat = -7.245347159802484;
                    const long = 112.73778883752102;
                    this.leafletPosition.lat = lat;
                    this.leafletPosition.lng = long;
                    this.map.setView(latLng([lat, long]));
                    this.setLoc(lat, long, 12);
                }
            );
        } else {
            this.leafletPosition.lat = this.lat;
            this.leafletPosition.lng = this.long;
        }
        this.isView = this.isViewParent;
    }

    ngAfterViewInit(): void {
        const searchBox = new google.maps.places.SearchBox(
            this.searchField.nativeElement,
        );
        // this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        //     this.searchField.nativeElement,
        // );
        searchBox.addListener('places_changed', () => {
            const places:any = searchBox.getPlaces();
            if (places.length === 0) {
                return;
            }
            const bounds = new google.maps.LatLngBounds();
            places.forEach(place => {
                if (!place.geometry || !place.geometry.location) {
                    return;
                }
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                };
                this.model.lat = place.geometry.location.lat();
                this.model.long = place.geometry.location.lng();
                const layer = {
                    lat: this.model.lat,
                    lng: this.model.long,
                };
                this.map.setView(layer, 15);
                this.setLoc(this.model.lat, this.model.long, 12);
            });
        });
    }

    ngOnChanges(changes: SimpleChanges | any) {
        if (changes.lat.currentValue && changes.long.currentValue) {
            this.model.lat = changes?.lat.currentValue;
            this.model.long = changes?.long.currentValue;
            const layer = {
                lat: this.model.lat,
                lng: this.model.long,
            };
            this.map.setView(layer, 15);
            this.setLoc(this.model.lat, this.model.long, 12);
        }
        this.isView = this.isViewParent;
    }

    onMapReady(map: Map) {
        this.map = map;
        if (
            this.leafletPosition.lat != 0 &&
            this.leafletPosition.lat != null &&
            this.leafletPosition.lat != undefined &&
            this.leafletPosition.lng != 0 &&
            this.leafletPosition.lng != null &&
            this.leafletPosition.lng != undefined &&
            !this.marker
        ) {
            const layer = {
                lat: this.leafletPosition.lat,
                lng: this.leafletPosition.lng,
            };
            this.map.setView(layer, 15);
            const loc = marker([
                this.leafletPosition.lat,
                this.leafletPosition.lng,
            ]).setIcon(
                icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: 'assets/img/marker-icon.png',
                })
            );
            this.setLoc(layer.lat, layer.lng, 12);
        }

        map.on('click', <LeafletMouseEvent>(e) => {
            if (!this.isView) {
                this.setLoc(e.latlng.lat, e.latlng.lng, 12);
            }
        });
    }

    setLoc(lat, lang, zoom) {
        // if (!this.isView) {
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }
        this.mapOptions.zoom = zoom;
        const loc = marker([lat, lang]).setIcon(
            icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: 'assets/img/marker-icon.png',
            })
        );
        loc.addTo(this.map);
        this.marker = loc;
        this.leafletPosition.lat = lat;
        this.leafletPosition.lng = lang;
        this.model.lat = lat;
        this.model.long = lang;
        this.koordinat.emit(this.model);
        // }
    }

    getLokasi(event) {
        const map = this.map;
        if (event) {
            const arr = event.split(' ');
            this.model.lat = arr[0];
            this.model.long = arr[1];
            const layer = {
                lat: this.model.lat,
                lng: this.model.long,
            };
            this.map.setView(layer, 15);
            this.setLoc(this.model.lat, this.model.long, 12);
        }
    }

    getPosition() {
        const map = this.map;
        this.globalService.getPosition().then((pos) => {
            const layer = {
                lat: pos.lat,
                lng: pos.long,
            };
            this.map.setView(layer, 15);
            this.setLoc(layer.lat, layer.lng, 12);
        });
        
    }

    getAlamat(keyword) {
        this.globalService.DataGet('/user/search_alamat', { keyword: keyword.target.value }).subscribe((res: any) => {
            this.listSearch = res.data;
        });
    }
}