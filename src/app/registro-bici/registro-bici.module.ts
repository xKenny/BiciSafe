import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroBiciPageRoutingModule } from './registro-bici-routing.module';

import { RegistroBiciPage } from './registro-bici.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroBiciPageRoutingModule
  ],
  declarations: [RegistroBiciPage]
})
export class RegistroBiciPageModule {}
