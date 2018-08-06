import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./auth/logout/logout.component";
import { RegistrationComponent } from './auth/registration.component';

const routes: Routes = [
{path: 'login', loadChildren: './auth/auth.module#AuthModule'},
{path: 'cliente', component : RegistrationComponent},
{path: 'logout', component: LogoutComponent},
{path: '', redirectTo: 'index', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }