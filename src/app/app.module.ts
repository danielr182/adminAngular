import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './services/interceptors/header.interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, NopagefoundComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [provideHttpClient(withInterceptors([headerInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
