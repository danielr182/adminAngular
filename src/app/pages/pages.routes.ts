import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medics/medic.component';
import { SearchComponent } from './search/search.component';
import { adminGuard, loginGuard } from '../services/service.index';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [loginGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'graphics', component: GraphicsComponent, data: { title: 'Graphics' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Dashboard' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'User Profile' } },
      { path: 'search/:term', component: SearchComponent, data: { title: 'Search' } },
      // Maintenance
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [adminGuard],
        data: { title: 'User maintenance' },
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        canActivate: [adminGuard],
        data: { title: 'Hospitals maintenance' },
      },
      { path: 'medics', component: MedicsComponent, canActivate: [adminGuard], data: { title: 'Medics maintenance' } },
      { path: 'medic/:id', component: MedicComponent, canActivate: [adminGuard], data: { title: 'Update medic' } },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
