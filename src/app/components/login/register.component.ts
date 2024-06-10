import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/service.index';

import swal from 'sweetalert2';
import { User } from '../../models/user.model';

declare function init_plugins(): void;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formSubmitted: boolean = false;

  constructor(public _userService: UserService, public router: Router, private fb: FormBuilder) {}

  areEqual(field1: string, field2: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pass1 = group.get(field1)?.value;
      const pass2 = group.get(field2)?.value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        areEqual: true,
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.createForm();
  }

  registerUser(): void {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const { name, email, password } = this.form.value;
    const user = new User({ name, email, password });

    this._userService.createUser(user).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  private createForm(): void {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password2: ['', Validators.required],
        conditions: [false],
      },
      { validators: this.areEqual('password', 'password2') }
    );

    this.form.setValue({
      name: 'test1',
      email: 'test1@mail.com',
      password: '123456',
      password2: '123456',
      conditions: true,
    });
  }
}
