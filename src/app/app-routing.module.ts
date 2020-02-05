import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppPreloadingStrategy } from './app-preloading-strategy';
import { UnsecuredLayoutComponent } from './layouts/unsecured/unsecured.layout.component';
import { GameComponent } from '@app/views/game/game.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: UnsecuredLayoutComponent,
    children: [
      {
        path: 'game',
        component: GameComponent
      },
      {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  providers: [AppPreloadingStrategy],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy })
  ],
  exports: [
    RouterModule,
    TranslateModule
  ]
})
export class AppRoutingModule { }