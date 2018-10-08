import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Config } from "../config/config";

@Injectable()
export class EnderecoService {

    public ENDPOINT;

    constructor(private http: HttpClient, public config: Config) {
        this.ENDPOINT = Config.getEndpoint();
    }

    getBairros(idCidade, tipo: string = 'refatorado') {
        if (tipo === 'legado') {
            return this.http.get(this.ENDPOINT + '/estados/' + idCidade + '/', Config.getHeader());
        } else if (tipo === 'refatorado') {
            return this.http.get(this.ENDPOINT + '/estados/cidade/' + idCidade + '/', Config.getHeader());
        }
    }
}