import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Config } from "../config/config";

@Injectable()
export class CargaService {

    public ENDPOINT;

    constructor(private http: HttpClient, public config: Config) {
        this.ENDPOINT = Config.getEndpoint();
    }

    getWimoveis(CodigoGrupo) {

        return this.http.get(this.ENDPOINT + '/admin/carga/wimoveis/'+ CodigoGrupo, Config.getHeader());

    }

    getUbiPlaces(CodigoGrupo) {

        return this.http.get(this.ENDPOINT + '/admin/carga/UbiPlaces/'+ CodigoGrupo, Config.getHeader());

    }

    getVivaReal(CodigoGrupo) {

        return this.http.get(this.ENDPOINT + '/admin/carga/vivareal/'+ CodigoGrupo, Config.getHeader());

    }

    getLugarCerto(CodigoGrupo) {

        return this.http.get(this.ENDPOINT + '/admin/carga/LugarCerto/'+ CodigoGrupo, Config.getHeader());

    }
}