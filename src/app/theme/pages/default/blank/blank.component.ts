import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BlankComponent implements OnInit {
      valorTotalVendas = 0;
      valorVendasDia =0;
      valorTotalVendasDia =0;
      totalUsers = 0;
  constructor() {
  }

  ngOnInit() {
  }
}