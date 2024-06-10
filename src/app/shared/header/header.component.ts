import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(public _userService: UserService, public _router: Router) {}

  ngOnInit() {}

  search(term: string) {
    if (!term) return;
    this._router.navigate(['/search', term]);
  }
}
