import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class Config {


    private static readonly ENDPOINT = 'http://localhost:3000';


    constructor() { }

    public static getEndpoint() { return this.ENDPOINT; }

    public static getHeader() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': JSON.parse(localStorage.getItem('userToken'))
            })
        };
    }
};