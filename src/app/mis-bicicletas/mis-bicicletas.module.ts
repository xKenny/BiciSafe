import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisBicicletasPageRoutingModule } from './mis-bicicletas-routing.module';

import { MisBicicletasPage } from './mis-bicicletas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisBicicletasPageRoutingModule
  ],
  declarations: [MisBicicletasPage]
})
export class MisBicicletasPageModule {}
