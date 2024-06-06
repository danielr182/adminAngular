import { AfterViewInit, Component } from '@angular/core';

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
      client_id: '621790932068-fsviqi6ag99b3n6d0r9ehf8p5v4rilbn.apps.googleusercontent.com',
    });
  }
}
