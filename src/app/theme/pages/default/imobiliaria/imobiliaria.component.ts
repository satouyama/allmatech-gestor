import { Component, OnInit, ViewEncapsulation, Pipe, PipeTransform, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Utils } from "../../../../models/utils";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";


import { Helpers } from '../../../../helpers';
import { LocationService } from '../../../../_services/location.service';

import { ImobiliariaServices } from '../../../../_services/imobiliaria.service';
import { UsuariosServices } from '../../../../_services/usuarios.services';


declare let swal: any;
declare let $: any;

@Component({
    selector: 'app-imobiliaria',
    templateUrl: './imobiliaria.component.html',
    styleUrls: ['imobiliaria.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ImobiliariaCompononent implements AfterViewInit {
    displayedColumns = [
        'Codigo',
        'Nome',
        'NomeReduzido',
        'Ativo'

    ];
    dataSource: MatTableDataSource<UsuarioData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    usuarioSelecionado: any;

    novoUsuario: any;

    public bairros;

    private readonly BRASILIA_CIDADE = 1;

    private readonly REFATORADO = 'refatorado';

    constructor(public http: HttpClient, public usuariosServices: UsuariosServices,
        public utils: Utils, public locationService: LocationService, public imobiliaria: ImobiliariaServices) {

        this.limparNovoUsuario();
        this.limparUsuarioSelecionado();
        this.atualizarListImobiliaria();
    }

    ngAfterViewInit() {
        Helpers.setBlockLoading('#usuarios-table-list', true);
    }

    atualizarListImobiliaria() {
        Helpers.setBlockLoading('#usuarios-table-list', true);
        this.imobiliaria.getImobiliaria().subscribe(

            (data: any) => {
                let imobiliaria = data;
                console.log(imobiliaria);

                this.dataSource = new MatTableDataSource(imobiliaria);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                Helpers.setBlockLoading('#usuarios-table-list', false);
            },
            error => {
                Helpers.setBlockLoading('#usuarios-table-list', false);
                console.log(error);
            });
    }


    updateAtivo(row){
        var ativos;
        var Codigo = row.Codigo;
        if(row.Ativo == true){
            ativos = false;
        } else {
            ativos = true;
        }


        this.usuariosServices.updateAtivo(ativos, Codigo).subscribe(
        (res : any) =>{
            swal({
                title: 'Sucesso!',
                text: 'Usuário atualizado com sucesso!',
                type: 'success',
                animation: true
            });
            this.atualizarListImobiliaria();
        },
        error =>{
            swal({
                title: 'Erro!',
                text: 'Não foi possível alterar o usuário, tente novamente!',
                type: 'warning',
                animation: true
            })
        }
        )
    }


    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    abrirNovoUsuario() {
        this.limparNovoUsuario();
        $('#m_modal_4').modal('show');
    }

    abrirPerfil(usu) {
        this.limparUsuarioSelecionado();
        this.usuarioSelecionado = usu;
        console.log(this.usuarioSelecionado);
        $('#modal_perfil').modal('show');
    }

    cadastrarUsuario() {
        Helpers.setBlockLoading('#usuarios-table-list', true);
        this.usuariosServices.cadastrarUsuario(this.novoUsuario).subscribe(
            data => {
                this.limparNovoUsuario();
                Helpers.setBlockLoading('#usuarios-table-list', false);
                $('#m_modal_4').modal('hide');
                swal({
                    title: 'Sucesso!',
                    text: 'Usuário cadastrado com sucesso!',
                    type: 'success',
                    animation: true
                });

            },
            error => {
                Helpers.setBlockLoading('#usuarios-table-list', false);
                swal({
                    title: 'Erro!',
                    text: 'Não foi possível cadastrar o usuário, tente novamente!',
                    type: 'warning',
                    animation: true
                })
            }
        );
    }

    limparUsuarioSelecionado() {
        this.usuarioSelecionado = {
            idUsuario: null,
            email: null,
            nome: null,
            cpf: null,
            telefone: null,
            enderecos: null,
            novoEnderecos: null,
            creditos: null,
            tokenPromo: null,
            imagemUrl: null,
            createdAt: null,
            updatedAt: null
        }
    }

    limparNovoUsuario() {
        this.novoUsuario = {
            nome: null,
            senha: "123456",
            email: null,
            telefone: null,
            cpf: null,

            idNovoBairro: null,
            endereco: null,
            cep: null,
            numero: null,
            referencia: null
        }
    }

    filtrarEndereco(row) {
        if ((row.enderecos !== null && row.enderecos.length > 0) && (row.novoEnderecos === null || row.novoEnderecos.length === 0)) {
            return row.enderecos[0].endereco + ', ' + row.enderecos[0].numero + ', ' + row.enderecos[0].cidade.nome
        } else if (row.novoEnderecos !== null && row.novoEnderecos.length > 0) {
            return row.novoEnderecos[0].endereco + ', ' + row.novoEnderecos[0].numero + ', ' + row.novoEnderecos[0].novoBairro.nome
        } else {
            return '';
        }
    }
}

export interface UsuarioData {
    idUsuario: string;
    email: string;
    nome: string;
    cpf: string;
    telefone: string;
    enderecos: any;
    novoEnderecos: any;
    creditos: number;
    tokenPromo: string;
    imagemUrl: string;
    createdAt: string;
    updatedAt: string;
}