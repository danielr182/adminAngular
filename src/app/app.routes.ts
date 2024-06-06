import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );
