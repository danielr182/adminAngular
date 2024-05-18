import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';

import swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

declare function init_plugins(): void;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  forma!: FormGroup;

  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  sonIguales(campo1: string, campo2: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pass1 = group.get(campo1)?.value;
      const pass2 = group.get(campo2)?.value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true,
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      { validators: this.sonIguales('password', 'password2') }
    );

    this.forma.setValue({
      nombre: 'test1',
      correo: 'test1@mail',
      password: '123456',
      password2: '123456',
      condiciones: false,
    });
  }

  resgitrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      swal.fire('Importante', 'Debes aceptar las condiciones', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe((resp) => {
      this.router.navigate(['/login']);
    });
  }
}
