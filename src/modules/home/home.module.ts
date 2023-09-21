import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as Components from './components';
import { HomeRoutingModule } from './home-routing.module';
import { DataService } from './services';
import { HomeEffects, homeReducer } from './state-management';

@NgModule({
  declarations: [Components.ConfigPanelComponent, Components.HomeLayoutComponent],
  imports: [
    EffectsModule.forFeature(HomeEffects),
    HomeRoutingModule,
    StoreModule.forFeature('home', homeReducer),
  ],
  providers: [DataService],
})
export class HomeModule {}
