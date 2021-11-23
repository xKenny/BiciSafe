import { Injectable } from "@angular/core";
import { bici } from "../services/bicicletas.service";

@Injectable({
    providedIn: 'root'
})
export class datosUsuario{
    email: string ="";
    id: string = "";
    nombre : string ="";

    get Email(){
        return this.email;
    }
    set Email(value){
        this.email = value;
    }
    get Id(){
        return this.id;
    }
    set Id(value){
        this.id = value;
    }
    get Nombre(){
        return this.nombre;
    }
    set Nombre(value){
        this.nombre = value;
    }
}