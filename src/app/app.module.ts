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
import { Config } from './config/config';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationModule } from './auth/registration.module';
import { NgxMaskModule } from 'ngx-mask'


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
    RegistrationModule,
    HttpClientModule,
    
  ],
  providers: [ScriptLoaderService,Config],
  bootstrap: [AppComponent]
})
export class AppModule { }