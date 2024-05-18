import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

export const AdminGuard: CanActivateFn = () => {
  const _usuarioService = inject(UsuarioService);
  if (_usuarioService.usuario?.role === 'ADMIN_ROLE') {
    return true;
  } else {
    _usuarioService.logOut();
    return false;
  }
};
