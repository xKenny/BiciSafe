import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.page.html',
  styleUrls: ['./politica.page.scss'],
})
export class PoliticaPage implements OnInit {

  constructor(private modalCtr : ModalController) { }

  ngOnInit() {
  }

  salirModal(){
    this.modalCtr.dismiss();
  }
}
