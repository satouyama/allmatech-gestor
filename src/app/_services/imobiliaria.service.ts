import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Config } from "../config/config";

@Injectable()
export class ImobiliariaServices {

    public ENDPOINT;
    public user = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: HttpClient, public config: Config) {
        this.ENDPOINT = Config.getEndpoint();
        console.log(Config.getHeader);
    }

    getDistribuidoras() {
        if (this.user.role == 'admin') {
            return this.http.get(this.ENDPOINT + '/admin/distribuidoras/list', Config.getHeader());
        }

        if (this.user.role == 'gerente') {
            return this.http.get(this.ENDPOINT + '/gerente/revendas/' + this.user.ID, Config.getHeader());
        }


    }



    getDistribuidoraSelecionada() {
        return JSON.parse(localStorage.getItem('selected_dist'));
    }

    setDistribuidoraSelecionada(dist) {
        localStorage.setItem('selected_dist', JSON.stringify(dist));
    }

    editarDistribuidora(revenda) {
        let body = {
            nome: revenda.nome,
            email: revenda.email,
            cnpj: revenda.cnpj,
            horarioInicio: revenda.horarioInicio,
            horarioFim: revenda.horarioFim,
            domingoHorarioInicio: revenda.domingoHorarioInicio,
            domingoHorarioFim: revenda.domingoHorarioFim,
            feriadoHorarioInicio: revenda.feriadoHorarioInicio,
            feriadoHorarioFim: revenda.feriadoHorarioFim,
            valorProduto: revenda.valorProduto,
            anp: revenda.anp,
            codigoCadastro: revenda.codigoCadastro
        };
        return this.http.put(this.ENDPOINT + '/admin/distribuidora/' + revenda.idDistribuidora + '/edit', body, Config.getHeader());
    }

    deletarDistribuidora(idDistribuidora) {
        return this.http.delete(this.ENDPOINT + '/admin/distribuidoras/' + idDistribuidora, Config.getHeader());
    }
    getImobiliaria() {
        return this.http.get(this.ENDPOINT + '/admin/imobiliaria/', Config.getHeader());
    }

    vincularEndereco(endereco) {
        return this.http.post(this.ENDPOINT + '/admin/distribuidoras/' + endereco.distribuidoraIdDistribuidora + '/endereco/', endereco, Config.getHeader());
    }

    vincularTelefone(telefone) {
        return this.http.post(this.ENDPOINT + '/admin/distribuidoras/' + telefone.distribuidoraIdDistribuidora + '/telefones/', telefone, Config.getHeader());
    }

    vincularGerente(gerente) {
        return this.http.put(this.ENDPOINT + '/gerente/vincular/distribuidora/' + gerente.distribuidoraIdDistribuidora, gerente, Config.getHeader());
    }

    repassarEntregador(data) {
        return this.http.put(this.ENDPOINT + '/admin/pedidos/repassarPedido/' + data.idPedido + '/' + data.idEntregador, {}, Config.getHeader());
    }
}