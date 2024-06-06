import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medics/medic.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

import { AdminGuard } from '../services/service.index';
import { loginGuard } from '../services/guards/login-guard.guard';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [loginGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'graficas1', component: Graficas1Component, data: { title: 'Graphics' } },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Dashboard' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'User Profile' } },
      { path: 'search/:term', component: BusquedaComponent, data: { title: 'Search' } },
      // Maintenance
      {
        path: 'users',
        component: UsersComponent,
        // canActivate: [AdminGuard],
        data: { title: 'User maintenance' },
      },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals maintenance' } },
      { path: 'medics', component: MedicsComponent, data: { title: 'Medics maintenance' } },
      { path: 'medic/:id', component: MedicComponent, data: { title: 'Update medic' } },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
