import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Config } from "../../config/config";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthenticationService {

    public ENDPOINT;
    public user;

    constructor(private http: HttpClient, public config: Config) {
        this.ENDPOINT = Config.getEndpoint();
    }

    login(email: string, password: string) {
        return this.http.post(this.ENDPOINT + '/admin/auth', JSON.stringify({ Login: email, Senha: password }), { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }) })
            .map((response: Response, error) => {
                // login successful if there's a jwt token in the response
                this.user = response;
                console.log(this.user);
                if (this.user && this.user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(this.user.user));
                    localStorage.setItem('userToken', JSON.stringify(this.user.token));

                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}