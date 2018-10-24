import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Config } from "../config/config";


@Injectable()
export class UsuariosServices {

    public ENDPOINT;
    public user;
    constructor(private http: HttpClient, public config: Config,
    ) {

        this.ENDPOINT = Config.getEndpoint();
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    getUsuarios() {
        return this.http.get(this.ENDPOINT + '/admin/usuarios/list', Config.getHeader());
    }


    cadastrarUsuario(usuario) {
        return this.http.post(this.ENDPOINT + '/usuarios/', usuario, Config.getHeader());
    }

    deleteUsuarios(idUsuario) {
        return this.http.delete(this.ENDPOINT + '/admin/usuarios/' + idUsuario, Config.getHeader());
    }

    updateAtivo(ativo : boolean, Codigo){
   
        return this.http.put(this.ENDPOINT + '/admin/imobiliaria/' + Codigo, {ativo : ativo}, Config.getHeader());
    }

}