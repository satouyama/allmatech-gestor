import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Config } from "../config/config";
import { DistribuidorasServices } from "./distribuidora.service";

@Injectable()
export class UsuariosServices {

    public ENDPOINT;
    public user;
    constructor(private http: HttpClient, public config: Config,
        public distribuidorasServices: DistribuidorasServices) {

        this.ENDPOINT = Config.getEndpoint();
        this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

    getUsuarios() {
        return this.http.get(this.ENDPOINT + '/admin/usuarios/list', Config.getHeader());
    }

    deleteUsuarios(idUsuario) {
        return this.http.delete(this.ENDPOINT + '/admin/usuarios/' + idUsuario, Config.getHeader());
    }

    getEntregadores(forceAdmin: boolean = false) {
        let selectedDist = this.distribuidorasServices.getDistribuidoraSelecionada();
        if (forceAdmin || this.user.role == 'admin') {
            if (selectedDist !== null) {
                return this.http.get(this.ENDPOINT + '/distribuidoras/' + selectedDist.idDistribuidora + '/entregadores', Config.getHeader());
            } else {
                return this.http.get(this.ENDPOINT + '/admin/entregadores/list', Config.getHeader());
            }
        } else if (this.user.role == 'dist') {
            return this.http.get(this.ENDPOINT + '/distribuidoras/' + this.user.idDistribuidora + '/entregadores', Config.getHeader());
        } else if (this.user.role == 'gerente') {
            if (selectedDist !== null) {
                return this.http.get(this.ENDPOINT + '/distribuidoras/' + selectedDist.idDistribuidora + '/entregadores', Config.getHeader());
            } else {
                return this.http.get(this.ENDPOINT + '/gerente/entregadores/list/' + this.user.ID, Config.getHeader());
            }
        }
    }

    alterarStatusEntregador(idEntregador, status: any) {
        if (this.user.role == 'admin') {
            return this.http.put(this.ENDPOINT + '/admin/entregadorData/' + idEntregador, { disponivel: status }, Config.getHeader());
        } else if (this.user.role == 'dist') {
            return this.http.put(this.ENDPOINT + '/distribuidoras/' + this.user.idDistribuidora + '/entregadorData/' + idEntregador, { disponivel: status }, Config.getHeader());
        }

    }

    getRelatorio() {
        let selectedDist = this.distribuidorasServices.getDistribuidoraSelecionada();
        if (this.user.role == 'admin') {
            if (selectedDist !== null) {
                return this.http.get(this.ENDPOINT + '/distribuidoras/' + selectedDist.idDistribuidora + '/pedidos', Config.getHeader());
            } else {
                return this.http.get(this.ENDPOINT + '/admin/pedidos', Config.getHeader());
            }
        } else if (this.user.role == 'dist') {
            return this.http.get(this.ENDPOINT + '/distribuidoras/' + this.user.idDistribuidora + '/pedidos', Config.getHeader());
        } else if (this.user.role == 'gerente') {
            if (selectedDist !== null) {
                return this.http.get(this.ENDPOINT + '/distribuidoras/' + selectedDist.idDistribuidora + '/pedidos', Config.getHeader());
            } else {
                return this.http.get(this.ENDPOINT + '/gerente/distribuidoras/' + this.user.ID, Config.getHeader());
            }
        }
    }

    deleteEntregador(idEntregador) {
        if (this.user.role == 'dist') {
            return this.http.delete(this.ENDPOINT + '/distribuidoras/' + this.user.idDistribuidora + '/entregadores', Config.getHeader());
        } else {
            return this.http.delete(this.ENDPOINT + '/admin/entregador/delete/' + idEntregador, Config.getHeader());
        }
    }

    cadastrarUsuario(usuario) {
        return this.http.post(this.ENDPOINT + '/usuarios/', usuario, Config.getHeader());
    }

    cadastrarEntregador(novoEntregador) {
        return this.http.post(this.ENDPOINT + '/entregadores', novoEntregador, Config.getHeader());
    }


    aleterarEntregador(novoEntregador) {
        return this.http.put(this.ENDPOINT + '/entregadores/' + novoEntregador.idEntregador, novoEntregador, Config.getHeader());
    }

    getCodigoPromocional() {
        return this.http.get(this.ENDPOINT + '/admin/promocao', Config.getHeader());
    }

}