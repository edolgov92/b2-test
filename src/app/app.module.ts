import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, EffectsModule.forRoot(), StoreModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
