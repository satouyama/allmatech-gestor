import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AlertComponent } from './_directives/alert.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { fakeBackendProvider } from './_helpers/index';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.routing';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [
        RegistrationComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RegistrationRoutingModule,
        NgxMaskModule.forRoot()
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        // api backend simulation
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions,
    ],

})

export class RegistrationModule {
}