import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisBicicletasPage } from './mis-bicicletas.page';

const routes: Routes = [
  {
    path: '',
    component: MisBicicletasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisBicicletasPageRoutingModule {}
