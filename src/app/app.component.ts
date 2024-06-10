import { AfterViewInit, Component } from '@angular/core';
import { environment } from '../environments/environment';

declare const google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'adminApp';
  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: environment.google_client_id,
    });
  }
}
