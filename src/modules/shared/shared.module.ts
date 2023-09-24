import { NgModule } from '@angular/core';
import * as Components from './components';

@NgModule({
  declarations: [Components.LogoComponent],
  exports: [Components.LogoComponent],
})
export class SharedModule {}
