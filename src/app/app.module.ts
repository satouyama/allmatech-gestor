import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";
import { HttpClientModule } from '@angular/common/http';
import { ProdutosServices } from './_services/produtos.service';
import { Config } from './config/config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagerService } from './_services/page.service';
import { CommonModule } from '@angular/common';
import {
    MatInputModule, MatPaginatorModule, MatTableDataSource, MatTableModule,
    MatToolbarModule,
    MatSortModule
} from "@angular/material";
import { DistribuidorasServices } from './_services/distribuidora.service';
import { LocationService } from './_services/location.service';
import { NgxMaskModule } from 'ngx-mask'
import { EnderecoService } from "./_services/endereco.service";
import { GerenteService } from "./_services/gerente.service";

import { PedidoService } from './_services/pedidos.service';

import { Utils } from "./models/utils";
import { AvaliacaoService } from './_services/availiacao.service';
import { ImobiliariaServices } from './_services/imobiliaria.service';
import { CargaService } from './_services/carga.service';
import { UsuariosServices } from './_services/usuarios.services';





@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent,
      

    ],
    imports: [
        NgxMaskModule.forRoot(),
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        AuthModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    providers: [
        ScriptLoaderService,
        ProdutosServices,
        Config,
        Utils,
        PagerService,
        DistribuidorasServices,
        LocationService,
        EnderecoService,
        GerenteService,
        ImobiliariaServices,
        PedidoService,
        AvaliacaoService,
        CargaService,
       UsuariosServices

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }