import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './views/game/game.component';
import { CoreModule } from './core.module';
import { AppUiModule } from './app-ui.module';
import { AppLayoutModule } from '@app/layouts/app-layout.module';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    CoreModule,
    AppUiModule,
    AppLayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
