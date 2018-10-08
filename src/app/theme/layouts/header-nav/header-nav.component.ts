import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    public usuario;

    constructor() {
        this.usuario = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.usuario);
    }
    ngOnInit() {

    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }

}