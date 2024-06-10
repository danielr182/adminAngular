import { UserService } from '../../services/user/user.service';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

declare function init_plugins(): void;
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    public _userService: UserService,
    private ngZone: NgZone
  ) {}
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  ngOnInit() {
    init_plugins();
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(): void {
    google.accounts.id.initialize({
      client_id: '621790932068-fsviqi6ag99b3n6d0r9ehf8p5v4rilbn.apps.googleusercontent.com',
      callback: (res: any) => this.ngZone.run(() => this.handleCredentialResponse(res)),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any): void {
    this._userService.loginGoogle(response.credential).subscribe(() => this._router.navigateByUrl('/'));
  }

  login() {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.value;
    const user = new User({ name: '', email, password });

    this._userService.login(user, this.form.value.rememberMe).subscribe(() => this._router.navigateByUrl('/'));
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [!!localStorage.getItem('email')],
    });
  }
}