import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { loginGuard } from './services/service.index';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', canMatch: [loginGuard], loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule) },
  { path: '**', component: NopagefoundComponent },
];
