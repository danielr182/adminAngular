import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// Rutas
import { APP_ROUTES } from './app.routes';

// Módulos
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
