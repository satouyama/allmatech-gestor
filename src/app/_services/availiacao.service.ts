import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Config } from "../config/config";

@Injectable()
export class AvaliacaoService {

    public ENDPOINT;

    constructor(private http: HttpClient, public config: Config) {
        this.ENDPOINT = Config.getEndpoint();
    }

    getAvaliacao() {

        return this.http.get(this.ENDPOINT + '/avaliacoes', Config.getHeader());

    }
}