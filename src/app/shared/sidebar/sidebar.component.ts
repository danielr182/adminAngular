import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { IMenu } from '../../models/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menus: IMenu[] = [];

  constructor(public _userService: UserService) {}

  ngOnInit() {
    this.menus = this._userService.menu;
  }
}
