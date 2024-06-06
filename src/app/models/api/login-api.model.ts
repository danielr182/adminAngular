import { User } from '../user.model';
import { AuthApi } from './auth-api.model';

export class LoginApi extends AuthApi {
  constructor(ok: boolean, token: string, public user: User) {
    super(ok, token);
  }
}
