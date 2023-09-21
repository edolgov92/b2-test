import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
