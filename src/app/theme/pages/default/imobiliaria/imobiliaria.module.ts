import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../default.component';
import { LayoutModule } from "../../../layouts/layout.module";

import { FormsModule } from '@angular/forms';
import {
    MatInputModule, MatSortModule, MatPaginatorModule, MatTableModule,
    MatToolbarModule
} from "@angular/material";
import { NgxMaskModule } from 'ngx-mask'
import { ImobiliariaCompononent } from './imobiliaria.component';



const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": ImobiliariaCompononent
            }
        ]
    }
];
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        CommonModule,
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatSortModule, MatPaginatorModule,
        NgxMaskModule.forRoot()
    ], exports: [
        RouterModule,
        CommonModule,
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatSortModule, MatPaginatorModule,
    ], declarations: [
        ImobiliariaCompononent
    ]
})
export class ImobiliariaModule {

}