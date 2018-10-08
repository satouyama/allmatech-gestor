import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Config } from "../config/config";

@Injectable()
export class LocationService {

    public ENDPOINT;

    private readonly LEGADO = 'legado';
    private readonly REFATORADO = 'refatorado';

    constructor(private http: HttpClient, public config: Config) {
        this.ENDPOINT = Config.getEndpoint();
    }

    getLocation(tipo: string = this.LEGADO) {
        if (tipo === this.LEGADO) {
            return this.http.get(this.ENDPOINT + '/admin/cep', Config.getHeader());
        } else {
            return this.http.get(this.ENDPOINT + '/admin/cep/refatorado', Config.getHeader());
        }
    }

    getBairros(idCidade, tipo: string = this.LEGADO) {
        if (tipo === this.LEGADO) {
            return this.http.get(this.ENDPOINT + '/estados/' + idCidade + '/', Config.getHeader());
        } else if (tipo === 'refatorado') {
            return this.http.get(this.ENDPOINT + '/estados/cidade/' + idCidade + '/', Config.getHeader());
        }
    }

    cadastrarLocation(location, tipo: string = this.LEGADO) {
        if (tipo === this.LEGADO) {
            let body = {
                nome: location.nome,
                cepInicio: location.cepInicio,
                cepFim: location.cepFim,
                idCidade: location.idBairro
            };
            return this.http.post(this.ENDPOINT + '/admin/cep', body, Config.getHeader());
        } else {
            let body = {
                nome: location.nome,
                cepInicio: location.cepInicio,
                cepFim: location.cepFim,
                novoBairroID: location.idBairro
            };
            return this.http.post(this.ENDPOINT + '/admin/cep/refatorado', body, Config.getHeader());
        }
    }

    editarLocation(produto, tipo: string = this.LEGADO) {
        if (tipo === this.LEGADO) {
            let body = {
                idCep: produto.idCep,
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                idCidade: produto.idBairro
            };
            return this.http.put(this.ENDPOINT + '/admin/cep/' + produto.idCep, body, Config.getHeader());
        } else {
            let body = {
                idCep: produto.idCep,
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                novoBairroID: produto.idBairro
            };
            return this.http.put(this.ENDPOINT + '/admin/cep/refatorado/' + produto.idCep, body, Config.getHeader());
        }
    }


    deletarLocation(idCep, tipo: string = this.LEGADO) {
        if (tipo === this.LEGADO) {
            return this.http.delete(this.ENDPOINT + '/admin/cep/' + idCep, Config.getHeader());
        } else {
            return this.http.delete(this.ENDPOINT + '/admin/cep/refatorado/' + idCep, Config.getHeader());
        }
    }

}