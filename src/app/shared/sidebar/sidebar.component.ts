import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';
import { IMenu } from '../../models/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  user!: User | null;
  menus: IMenu[] = [];

  constructor(public _userService: UserService) {}

  ngOnInit() {
    this.user = this._userService.user;
    this.menus = this._userService.menu;
  }
}
