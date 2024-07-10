import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export abstract class MetaDataService {
    constructor(
        private titleService: Title,
        private metaService: Meta
    ) { }

    url = environment.url;

    updateTags(tag = '', partUrl = '', description = '', img = '') {
        const endTitle = ' | Jakarta Camera';
        const pageTitle = tag + endTitle;

        if (tag !== '') {
            this.updateTitle(pageTitle);
        }
        else {
            this.updateTitle('Jakarta Camera | Official Store');
        }

        if (partUrl !== '') {
            this.updateUrl(this.url + '/' + partUrl);
        }
        else {
            this.updateUrl(this.url);
        }

        if (description !== '') {
            this.updateDescription(description);
        }
        else {
            this.updateDescription('Jakarta Camera adalah toko terpercaya yang melayani jual beli dan sewa kamera di Jakarta. Kami menyediakan berbagai jenis kamera dan perlengkapan fotografi berkualitas tinggi untuk memenuhi kebutuhan Anda, baik untuk keperluan profesional maupun hobi.');
        }

        if (img !== '') {
            this.updateImage(img);
        }
        else {
            this.updateImage('https://jakartacamera.moodstudio.id/favico.ico');
        }
    }

    private updateTitle(title) {
        this.titleService.setTitle(title);
        this.metaService.updateTag({ name: 'og:title', content: title });
        this.metaService.updateTag({ name: 'twitter:title', content: title });
        this.metaService.updateTag({ name: 'title', property: 'og:title', content: title });
    }

    private updateDescription(description) {
        this.metaService.updateTag({ name: 'og:description', content: description.substring(0, 150) });
        this.metaService.updateTag({ name: 'description', property: 'og:description', content: description.substring(0, 150) });
    }

    private updateUrl(url) {
        this.metaService.updateTag({ name: 'og:url', content: url });
        this.metaService.updateTag({ property: 'twitter:url', content: url });
    }

    private updateImage(img) {
        this.metaService.updateTag({ name: 'og:image', content: img });
        this.metaService.updateTag({ name: 'twitter:image', content: img });
        this.metaService.updateTag({ name: 'image', property: 'og:image', content: img });
    }
}
