import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCityComponent } from './select-city/select-city.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'selectCity',
    pathMatch: 'full',
  },
  {
    path: 'selectCity',
    component: SelectCityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
