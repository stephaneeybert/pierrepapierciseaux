import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const APP_COLOR = '#343a40';
const APP_IMAGE = '/assets/icons/icon-72x72.png';
const APP_TITLE = 'PierrePapierCiseaux';
const APP_DESCRIPTION = 'Le jeu de pierre papier ciseaux';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private meta: Meta, private title: Title) { }

  public setMetaData(config: any): void {
    const description = config.description || APP_DESCRIPTION;
    const image = config.image || APP_IMAGE;
    const title = config.title ? `${config.title}` : APP_TITLE;
    const color = config.color || APP_COLOR;
    this.title.setTitle(title);

    const tags = [
      { name: 'description', content: description },
      { name: 'theme-color', content: color },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: title },
      { name: 'apple-touch-startup-image', content: image },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
    ];
    tags.forEach(tag => this.meta.updateTag(tag));
  }

}
