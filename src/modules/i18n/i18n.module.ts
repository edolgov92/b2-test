import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';

@NgModule({
  imports: [CommonModule, NgxWebstorageModule, TranslateModule],
})
export class I18nModule {}
