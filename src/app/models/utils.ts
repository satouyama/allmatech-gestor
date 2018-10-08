import { Injectable } from "@angular/core";

@Injectable()
export class Utils {

    constructor() { }

    formatarDate(txt) {
        var monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        var data = new Date(txt);//ISO DATA
        var h = (data.getHours().toString().length == 1) ? "0" + data.getHours().toString() : data.getHours();
        var m = (data.getMinutes().toString().length == 1) ? "0" + data.getMinutes().toString() : data.getMinutes();
        var s = (data.getSeconds().toString().length == 1) ? "0" + data.getSeconds().toString() : data.getSeconds();
        return data.getUTCDate() + ' de ' + monthNames[data.getMonth()].toLowerCase() + ' de ' + data.getFullYear() + " às " + h + ":" + m + ":" + s;
    }

    formatEmailLink(email) {
        return 'mailto:' + email;
    }

}