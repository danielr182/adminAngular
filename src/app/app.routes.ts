import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from 'src/app/login/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );
