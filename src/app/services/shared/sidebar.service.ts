import { Injectable } from '@angular/core';
import { ServiceModule } from '../service.module';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: ServiceModule
})

export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Dashboard',
          url: '/dashboard'
        },
        {
          title: 'ProgressBar',
          url: '/progress'
        },
        {
          title: 'Graficas',
          url: '/graficas1'
        },
        {
          title: 'Promesas',
          url: '/promesas'
        },
        {
          title: 'RxJs',
          url: '/rxjs'
        }
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Users',
          url: '/users'
        },
        {
          title: 'Hospitals',
          url: '/hospitals'
        },
        {
          title: 'Medics',
          url: '/medics'
        }
      ]
    }
  ];

  constructor(public _userService: UserService) {
    // this.menu = _userService.menu;
  }
}
