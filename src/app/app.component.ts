import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';

import { UiService } from '@app/core/service/ui.service';

const LANGUAGE_CODE_ENGLISH = 'en';
const LANGUAGE_CODE_FRANCAIS = 'fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    private translateService: TranslateService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.translateService.addLangs([LANGUAGE_CODE_ENGLISH, LANGUAGE_CODE_FRANCAIS])
    // The default language used as a fallback if a translation isn't found for the current language
    this.translateService.setDefaultLang(LANGUAGE_CODE_FRANCAIS);
    // The language to use
    this.translateService.use(LANGUAGE_CODE_FRANCAIS);
    console.log('The browser current language is: ' + this.translateService.getBrowserLang());

    const appNewVersion = this.translateService.instant('app.new_version_available');
    console.log(appNewVersion);
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const appNewVersion = this.translateService.instant('app.new_version_available');
        if (confirm(appNewVersion)) {
          window.location.reload();
        }
      });
    }

    this.metaData();
  }

  private metaData() {
    this.uiService.setMetaData({
      title: this.translateService.instant('app.title'),
      description: this.translateService.instant('app.description')
    });
  }

}
