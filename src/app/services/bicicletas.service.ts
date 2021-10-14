import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

export interface bici {
  id :string;
  marca :string;
  color :string;
  modelo :string;
  nroMarco :string;
  tipo :string;
  valor :string;
  imagen :string;
}

@Injectable({
  providedIn: 'root'
})
export class BicicletasService {

  constructor(private db : AngularFirestore) { }

  getBicicletas(){
    return this.db.collection("bicicletas").snapshotChanges().pipe(map(bicis => {
      return bicis.map(a =>{
        const data = a.payload.doc.data() as bici;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  crearBicicleta<tipo>(data: tipo, enlace: string, id: string){
    const ref = this.db.collection("bicicletas");
    return ref.doc(id).set(data)
  }

  crearId(){
    return this.db.createId();
  }
}
