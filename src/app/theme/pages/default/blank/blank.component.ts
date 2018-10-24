import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DistribuidorasServices } from '../../../../_services/distribuidora.service';
import { ProdutosServices } from '../../../../_services/produtos.service';
import { Helpers } from "../../../../helpers";
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { PedidoService } from '../../../../_services/pedidos.service';
import { UsuariosServices } from '../../../../_services/usuarios.services';

declare let $: any;
declare let Chartist: any;
declare let mApp: any;
declare let Chart: any;
declare let document: any;

@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class BlankComponent implements OnInit {
    public user;
    public pedidos;
    public totalUsers;
    public totalPedidosDia = 0;

    public totalPedidosDinheiro;
    public totalPedidosDebito;
    public totalPedidosCredito;

    public valorFinal = [];
    public valorTotalVendas = 0;
    public valorTotalVendasDia = 0;

    pedidosEstatisticas = {
        totalOrders: 0,
        deliveredOrders: 0,
        notDeliveredOrders: 0,
        canceledOrders: 0
    };

    constructor(public pedidosService: ProdutosServices,
        public distribuidoraService: DistribuidorasServices, private _script: ScriptLoaderService,
       public pedidoService: PedidoService, public usuarioServices : UsuariosServices) {

        this.user = JSON.parse(localStorage.getItem('currentUser'));
     
         

    }

    pedidosDia() {
        this.pedidoService.getPedidosDia().subscribe(
            (res: any) => {
                this.totalPedidosDia = res;
                let valorDia = [];

                for (let rev of res) {
                    valorDia.push(rev.valorFinal);

                }

                this.valorTotalVendasDia = 0;
                this.totalPedidosDia = res.length;

            },
            error => {

            }
        )
    }

    ngAfterViewInit() {
        this._script.loadScripts('app-charts-google-charts',
            ['assets/demo/default/custom/components/charts/google-charts.js']);

    }


    ngOnInit() {
        if (this.user.role == 'dist') {
            this.carregarEstatisticas(this.user.idDistribuidora);
        } else {
            let dist = this.distribuidoraService.getDistribuidoraSelecionada();
            this.carregarEstatisticas(null);
        }
    }

    carregarEstatisticas(idDistribuidora) {

        let dist = this.distribuidoraService.getDistribuidoraSelecionada();
        this.pedidosService.getPedidos().subscribe(
            (data: any) => {
                if (this.user.role === 'gerente') {
                    this.valorTotalVendasDia = 0;
                    if (dist !== null) {
                        this.pedidos = data;
                        this.pedidosEstatisticas = Helpers.contarPedidos(data, idDistribuidora);
                    } else {
                        let result = [];
                        for (let rev of data) {
                            for (let pedido of rev.pedidos) {
                                result.push(pedido);
                                let valor = [];

                                for (let rev of result) {
                                    valor.push(rev.valorFinal);

                                }

                                this.valorTotalVendas = 0;


                            }
                        }
                        this.pedidos = result;
                        this.pedidosEstatisticas = Helpers.contarPedidos(result, idDistribuidora);
                    }
                } else {
                    let valor = [];

                    for (let rev of data) {
                        valor.push(rev.valorFinal);

                    }

                    this.valorTotalVendas = 0;


                    this.pedidos = data;
                    this.pedidosEstatisticas = Helpers.contarPedidos(data, idDistribuidora);

                }

                this.totalPedidosDinheiro = 0;
                this.totalPedidosDebito = 0;
                this.totalPedidosCredito = 0;

                for (let ped of this.pedidos) {
                    switch (ped.tipoPagamento) {
                        case 1:
                            ++this.totalPedidosDinheiro;
                            break;
                        case 2:
                            ++this.totalPedidosDebito;
                            break;
                        case 3:
                            ++this.totalPedidosCredito;
                            break;
                        default:
                    }
                }

                this.iniciarCharts();
                this.iniciarChartSemanal();
                this.iniciarChartMensal();
                this.iniciarChartVendasTipo();
                Helpers.setBlockLoading('#resumo-pedidos', false);
            },
            error => {
                console.log(error);
            }
        )
    }

    iniciarChartVendasTipo() {
        var e = $("#m_chart_vendas_tipo");
        if (0 != e.length) {
            var t = {
                labels: [
                    "Dinheiro",
                    "Débito",
                    "Crédito"
                ],
                datasets: [
                    {
                        backgroundColor: "#430837",
                        data: [
                            this.totalPedidosDinheiro,
                            this.totalPedidosDebito,
                            this.totalPedidosCredito,
                        ]
                    },
                    /*
                    {
                        backgroundColor: "#f3f3fb", data: [15, 20, 25, 30, 25, 20, 15]
                    }
                    */
                ]
            }
                ;
            new Chart(e, {
                type: "bar", data: t, options: {
                    title: {
                        display: !1
                    }
                    , tooltips: {
                        intersect: !1, mode: "nearest", xPadding: 10, yPadding: 10, caretPadding: 10
                    }
                    , legend: {
                        display: !1
                    }
                    , responsive: !0, maintainAspectRatio: !1, barRadius: 4, scales: {
                        xAxes: [{
                            display: !1, gridLines: !1, stacked: !0
                        }
                        ], yAxes: [{
                            display: !1, stacked: !0, gridLines: !1
                        }
                        ]
                    }
                    , layout: {
                        padding: {
                            left: 0, right: 0, top: 0, bottom: 0
                        }
                    }
                }
            }
            )
        }
    }

    carregarTotalUsuarios() {

        $('#m_modal_6').modal("hide")
        this.usuarioServices.getUsuarios().subscribe(
            (res: any) => {
                this.totalUsers = res.length;
            },
            error => {
                console.log(error);
            }
        )
    }

    iniciarCharts() {
        var e = new Chartist.Pie("#m_chart_profit_share", {
            series: [
                {
                    value: this.pedidosEstatisticas.deliveredOrders,
                    className: "custom",
                    meta: {
                        color: mApp.getColor("success")
                    }
                },
                {
                    value: this.pedidosEstatisticas.notDeliveredOrders,
                    className: "custom",
                    meta: {
                        color: mApp.getColor("warning")
                    }
                },
                {
                    value: this.pedidosEstatisticas.canceledOrders,
                    className: "custom",
                    meta: {
                        color: mApp.getColor("danger")
                    }
                }
            ], labels: [1, 2, 3]
        }, {
                donut: true, donutWidth: 17, showLabel: false
            }
        );

        e.on("draw", function(e) {
            if ("slice" === e.type) {
                var t = e.element._node.getTotalLength();
                e.element.attr({
                    "stroke-dasharray": t + "px " + t + "px"
                });
                var a: any = {
                    "stroke-dashoffset": {
                        id: "anim" + e.index, dur: 1e3, from: -t + "px", to: "0px", easing: Chartist.Svg.Easing.easeOutQuint, fill: "freeze", stroke: e.meta.color
                    }
                };
                0 !== e.index && (a["stroke-dashoffset"].begin = "anim" + (e.index - 1) + ".end"), e.element.attr({
                    "stroke-dashoffset": -t + "px", stroke: e.meta.color
                }
                ), e.element.animate(a, !1)
            }
        });
    }

    iniciarChartSemanal() {
        var e = $("#m_chart_daily_sales");
        if (0 != e.length) {
            var t = {
                labels: [
                    "Domingo",
                    "Segunda-Feira",
                    "Terça-Feira",
                    "Quarta-Feira",
                    "Quinta-Feira",
                    "Sexta-Feira",
                    "Sábado"
                ],
                datasets: [
                    {
                        backgroundColor: mApp.getColor("success"),
                        data: [
                            15,
                            20,
                            25,
                            30,
                            25,
                            20,
                            15
                        ]
                    },
                    /*
                    {
                        backgroundColor: "#f3f3fb", data: [15, 20, 25, 30, 25, 20, 15]
                    }
                    */
                ]
            }
                ;
            new Chart(e, {
                type: "bar", data: t, options: {
                    title: {
                        display: !1
                    }
                    , tooltips: {
                        intersect: !1, mode: "nearest", xPadding: 10, yPadding: 10, caretPadding: 10
                    }
                    , legend: {
                        display: !1
                    }
                    , responsive: !0, maintainAspectRatio: !1, barRadius: 4, scales: {
                        xAxes: [{
                            display: !1, gridLines: !1, stacked: !0
                        }
                        ], yAxes: [{
                            display: !1, stacked: !0, gridLines: !1
                        }
                        ]
                    }
                    , layout: {
                        padding: {
                            left: 0, right: 0, top: 0, bottom: 0
                        }
                    }
                }
            }
            )
        }
    }

    iniciarChartMensal() {
        var e = document.getElementById("m_chart_trends_stats").getContext("2d"),
            t = e.createLinearGradient(0, 0, 0, 240);
        t.addColorStop(0, Chart.helpers.color("#00c5dc").alpha(.7).rgbString()),
            t.addColorStop(1, Chart.helpers.color("#f2feff").alpha(0).rgbString());
        var a = {
            type: "line",
            data: {
                labels: [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro",
                    "Janeiro"
                ],
                datasets: [
                    {
                        label: "Estatísticas de Vendas",
                        backgroundColor: t,
                        borderColor: "#0dc8de",
                        pointBackgroundColor: Chart.helpers.color("#ffffff").alpha(0).rgbString(),
                        pointBorderColor: Chart.helpers.color("#ffffff").alpha(0).rgbString(),
                        pointHoverBackgroundColor: mApp.getColor("danger"),
                        pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.2).rgbString(),
                        data: [20, 10, 18, 63, 26, 18, 15, 22, 16, 12, 54, 12, 20]
                    }
                ]
            }
            ,
            options: {
                title: {
                    display: !1
                }
                ,
                tooltips: {
                    intersect: !1, mode: "nearest", xPadding: 10, yPadding: 10, caretPadding: 10
                }
                ,
                legend: {
                    display: !1
                }
                ,
                responsive: !0,
                maintainAspectRatio: !1,
                hover: {
                    mode: "index"
                }
                ,
                scales: {
                    xAxes: [{
                        display: !1,
                        gridLines: !1,
                        scaleLabel: {
                            display: !0, labelString: "Month"
                        }
                    }
                    ],
                    yAxes: [{
                        display: !1,
                        gridLines: !1,
                        scaleLabel: {
                            display: !0, labelString: "Value"
                        }
                        ,
                        ticks: {
                            beginAtZero: !0
                        }
                    }
                    ]
                }
                ,
                elements: {
                    line: {
                        tension: .19
                    }
                    ,
                    point: {
                        radius: 4, borderWidth: 12
                    }
                }
                ,
                layout: {
                    padding: {
                        left: 0, right: 0, top: 5, bottom: 0
                    }
                }
            }
        }
            ;
        new Chart(e, a)
    }
}