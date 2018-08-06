import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';

@Component({
  selector: 'app-blank',
  templateUrl: './cliente.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClienteComponent implements OnInit {
      valorTotalVendas = 0;
      valorVendasDia =0;
      valorTotalVendasDia =0;
      totalUsers = 0;
      constructor(private _script: ScriptLoaderService)  {

    }
  ngOnInit() {
  }
  ngAfterViewInit()  {
    this._script.loadScripts('body',
    ['assets/demo/default/custom/crud/wizard/wizard.js']);
    
    }
}