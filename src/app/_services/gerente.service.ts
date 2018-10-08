import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Config } from "../config/config";

@Injectable()
export class GerenteService {

    public ENDPOINT;

    constructor(private http: HttpClient, public config: Config) {
        this.ENDPOINT = Config.getEndpoint();
    }

    getGerentes() {
        return this.http.get(this.ENDPOINT + '/gerente/', Config.getHeader());
    }

    cadastrarGerente(gerente) {
        return this.http.post(this.ENDPOINT + '/gerente/', gerente, Config.getHeader());
    }

    deleteGerente(row) {
        return this.http.delete(this.ENDPOINT + '/gerente/' + row.ID, Config.getHeader());
    }

    getRevendasgerente(idGerente) {
        return this.http.get(this.ENDPOINT + '/gerente/revendas/' + idGerente, Config.getHeader())
    }
}