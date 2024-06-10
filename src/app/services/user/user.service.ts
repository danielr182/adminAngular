import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Observable, of } from 'rxjs';
import { LoginApi } from '../../models/api/login-api.model';
import { environment } from '../../../environments/environment';
import { SearchApi } from '../../models/api/search-api.model';
import { UserPaginationApi } from '../../models/api/pagination-api.model';
import { IMenu } from '../../models/menu';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User | null;
  menu!: IMenu[];
  userUrl = environment.base_url + '/user';

  constructor(public _http: HttpClient, public router: Router) {
    this.loadLocalStorage();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): Object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  loadLocalStorage(): void {
    const localUser = localStorage.getItem('user');
    const localMenu = localStorage.getItem('menu') ?? '[]';
    if (this.token) {
      this.user = localUser ? new User(JSON.parse(localUser)) : null;
      this.menu = JSON.parse(localMenu);
    } else {
      this.user = null;
      this.menu = [];
    }
  }

  saveOnLocalStorage(token: string, user: User, menu: IMenu[]): void {
    localStorage.setItem('id', user.uid ?? '');
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.user = new User(user);
    this.menu = menu;
  }

  login(user: User, remember: boolean = false): Observable<LoginApi> {
    const url = environment.base_url + '/login';
    remember ? localStorage.setItem('email', user.email) : localStorage.removeItem('email');

    return this._http.post<LoginApi>(url, user).pipe(
      tap((resp) => {
        this.saveOnLocalStorage(resp.token, resp.user, resp.menu);
      }),
      catchError((err) => {
        Swal.fire('Login error', err.error.message, 'error');
        throw err;
      })
    );
  }

  loginGoogle(token: string): Observable<void> {
    const url = environment.base_url + '/login/google';
    return this._http.post<LoginApi>(url, { token }).pipe(
      map((resp) => {
        this.saveOnLocalStorage(resp.token, resp.user, resp.menu);
      })
    );
  }

  logOut() {
    if (this.user?.google) {
      google.accounts.id.disableAutoSelect();
      google.accounts.id.revoke(this.user?.email);
    }

    this.user = null;
    this.menu = [];
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  createUser(user: User): Observable<User> {
    return this._http.post<LoginApi>(this.userUrl, user).pipe(
      map((resp) => {
        this.saveOnLocalStorage(resp.token, resp.user, resp.menu);
        Swal.fire('User created', user.email, 'success');
        return resp.user;
      }),
      catchError((err) => {
        Swal.fire('Error', err.error.message, 'error');
        throw err;
      })
    );
  }

  updateUser(user: User, showAlertOnSuccess = true): Observable<void> {
    const url = `${this.userUrl}/${user.uid}`;
    return this._http
      .put(url, user, this.headers)
      .pipe(
        map((resp: any) => {
          if (user.uid === this.user?.uid) {
            this.saveOnLocalStorage(this.token, resp.user, this.menu);
          }
          if (showAlertOnSuccess) {
            Swal.fire('Updated User', user.name, 'success');
          }
        }),
        catchError((err) => {
          Swal.fire('Error', err.error.message, 'error');
          throw err;
        })
      );
  }

  loadUsers(from: number = 0, limit: number = 0): Observable<UserPaginationApi> {
    const url = `${this.userUrl}?from=${from}&limit=${limit}`;
    return this._http
      .get<UserPaginationApi>(url, this.headers)
      .pipe(
        map((res) => {
          res.users = res.users.map((user) => new User(user));
          return res;
        })
      );
  }

  searchUser(term: string): Observable<User[]> {
    const url = `${environment.base_url}/search/collection/users/${term}`;
    return this._http
      .get<SearchApi>(url, this.headers)
      .pipe(
        map((res) => {
          return res.results.map((user) => new User(<User>user));
        }),
        catchError((err) => {
          Swal.fire('Error', err.error.message, 'error');
          throw err;
        })
      );
  }

  deleteUser(id: string): Observable<void> {
    const url = `${this.userUrl}/${id}`;
    return this._http.delete(url, this.headers).pipe(
      map(() => {
        Swal.fire('User deleted', 'The user has been deleted successfully', 'success');
      }),
      catchError((err) => {
        Swal.fire('Error', err.error.message, 'error');
        throw err;
      })
    );
  }


  validateToken(): Observable<boolean> {
    const url = environment.base_url + '/login/renew';

    return this._http
      .get<LoginApi>(url, this.headers)
      .pipe(
        map((resp) => {
          this.saveOnLocalStorage(resp.token, resp.user, resp.menu);
          return true;
        }),
        catchError(() => of(false))
      );
  }
}
