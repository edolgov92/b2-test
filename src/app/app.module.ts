import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../modules';
import { AppRoutingModule } from './app-routing.module';
import * as Components from './components';

@NgModule({
  declarations: [Components.AppComponent, Components.SplashScreenComponent],
  imports: [AppRoutingModule, BrowserModule, EffectsModule.forRoot(), SharedModule, StoreModule.forRoot()],
  providers: [],
  bootstrap: [Components.AppComponent],
})
export class AppModule {}
