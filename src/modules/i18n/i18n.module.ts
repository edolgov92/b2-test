import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import * as Components from './components';

@NgModule({
  imports: [CommonModule, NgxWebstorageModule, TranslateModule],
  declarations: [Components.SwitchLanguagePopoverComponent],
  exports: [Components.SwitchLanguagePopoverComponent],
})
export class I18nModule {}
