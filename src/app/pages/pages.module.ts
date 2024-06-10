import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesComponent } from '../pages/pages.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Módulos
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

import { IncreaserComponent } from '../components/increaser/increaser.component';
import { DonutComponent } from '../components/donut/donut.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medics/medic.component';
import { SearchComponent } from './search/search.component';
import {
  FileUploadService,
  HospitalService,
  MedicService,
  SearchService,
  SettingsService,
  SidebarService,
} from '../services/service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
    IncreaserComponent,
    DonutComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    ModalUploadComponent,
    HospitalsComponent,
    MedicsComponent,
    MedicComponent,
    SearchComponent,
  ],
  exports: [DashboardComponent, ProgressComponent, GraphicsComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, NgChartsModule, PipesModule, PAGES_ROUTES],
  providers: [
    FileUploadService,
    ModalUploadService,
    HospitalService,
    MedicService,
    SidebarService,
    SearchService,
    SettingsService,
  ],
})
export class PagesModule {}
