import { environment } from '../../environments/environment';

export interface IUser {
  name: string;
  email: string;
  password: string;
  img?: string;
  role?: string;
  google?: boolean;
  uid?: string;
}

export class User {
  name: string;
  email: string;
  password: string;
  img?: string;
  role?: string;
  google?: boolean;
  uid?: string;

  constructor(user: IUser) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    if (user.img) {
      this.img = user.img;
    }
    if (user.role) {
      this.role = user.role;
    }
    if (user.google) {
      this.google = user.google;
    }
    if (user.uid) {
      this.uid = user.uid;
    }
  }

  get urlImage() {
    if (this.img?.includes('http')) {
      return this.img;
    }
    const base_url = `${environment.base_url}/image/users`;
    return this.img ? `${base_url}/${this.img}` : `${base_url}/no-image`;
  }
}
