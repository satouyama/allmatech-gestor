import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Config } from "../config/config";
import { DistribuidorasServices } from "./distribuidora.service";

@Injectable()
export class PedidoService {

    public ENDPOINT;
    public user = JSON.parse(localStorage.getItem('currentUser'));
    constructor(private http: HttpClient, public config: Config,
        public distribuidorasServices: DistribuidorasServices) {
        this.ENDPOINT = Config.getEndpoint();
    }

    getPedidos() {
        let selectedDist = this.distribuidorasServices.getDistribuidoraSelecionada();
        if (this.user.role == 'dist') {
            return this.http.get(this.ENDPOINT + '/distribuidoras/' + this.user.idDistribuidora + '/pedidosPendentes/', Config.getHeader());
        } else if (this.user.role == 'admin') {
            if (selectedDist !== null) {
                return this.http.get(this.ENDPOINT + '/distribuidoras/' + selectedDist.idDistribuidora + '/pedidosPendentes/', Config.getHeader());
            } else {
                return this.http.get(this.ENDPOINT + '/admin/pedidosPendentes/', Config.getHeader());
            }
        } else if (this.user.role == 'gerente') {
            if (selectedDist !== null) {
                return this.http.get(this.ENDPOINT + '/distribuidoras/' + selectedDist.idDistribuidora + '/pedidosPendentes/', Config.getHeader());
            } else {
                return this.http.get(this.ENDPOINT + '/gerente/distribuidoras/pendente/' + this.user.ID, Config.getHeader());
            }
        }
    }

    getPedidosDia() {
        if (this.user.role == 'admin') {
            return this.http.get(this.ENDPOINT + '/admin/pedidos/dia/', Config.getHeader());
        }
        if (this.user.role == 'dist') {
            return this.http.get(this.ENDPOINT + '/distribuidoras/' + this.user.idDistribuidora + '/pedidos/dia/', Config.getHeader());
        }
    }

    getBairros(idCidade, tipo: string = 'legado') {
        if (tipo === 'legado') {
            return this.http.get(this.ENDPOINT + '/estados/' + idCidade + '/', Config.getHeader());
        } else if (tipo === 'refatorado') {
            return this.http.get(this.ENDPOINT + '/estados/cidade/' + idCidade + '/', Config.getHeader());
        }
    }

    cadastrarProduto(produto, tipo: string = 'legado') {
        if (tipo === 'legado') {
            return this.http.post(this.ENDPOINT + '/admin/novoProduto', produto, Config.getHeader());
        } else {
            let body = {
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                idNovoBairro: produto.idCidade
            };
            return this.http.post(this.ENDPOINT + '/admin/novoProduto/refatorado', body, Config.getHeader());
        }
    }

    editarProduto(produto, tipo: string = 'legado') {
        console.log(produto);
        if (tipo === 'legado') {
            return this.http.put(this.ENDPOINT + '/admin/alterarProduto/' + produto.idProduto, produto, Config.getHeader());
        } else {
            let body = {
                idProduto: produto.idProduto,
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                idNovoBairro: produto.idCidade
            };
            return this.http.put(this.ENDPOINT + '/admin/alterarProduto/refatorado/' + produto.idProduto, body, Config.getHeader());
        }
    }

    deletarProduto(idProduto, tipo: string = 'legado') {
        if (tipo === 'legado') {
            return this.http.delete(this.ENDPOINT + '/admin/deleteProduto/' + idProduto, Config.getHeader());
        } else {
            return this.http.delete(this.ENDPOINT + '/admin/deleteProduto/refatorado/' + idProduto, Config.getHeader());
        }
    }

    alterarStatusPedido(status, idPedido) {
        if (this.user.role == 'admin') {
            return this.http.put(this.ENDPOINT + '/admin/pedidos/' + idPedido, { status: status }, Config.getHeader());
        }
        else if (this.user.role == 'dist') {
            return this.http.put(this.ENDPOINT + '/distribuidoras/' + this.user.idDistribuidora + '/pedidos/' + idPedido, { status: status }, Config.getHeader());
        }

    }

}