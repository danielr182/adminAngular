import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user!: User | null;

  constructor(public _userService: UserService, public _sidebarService: SidebarService) { }

  ngOnInit() {
    this.user = this._userService.user;
  }

}
