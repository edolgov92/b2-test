import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared';
import * as Components from './components';
import { HomeRoutingModule } from './home-routing.module';
import { DataService } from './services';
import { HomeEffects, homeReducer } from './state-management';

@NgModule({
  declarations: [
    Components.ConfigPanelComponent,
    Components.DataTableComponent,
    Components.HomeLayoutComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature(HomeEffects),
    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('home', homeReducer),
    TranslateModule.forChild(),
  ],
  providers: [DataService],
})
export class HomeModule {}
