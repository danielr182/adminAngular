import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Medic } from '../../models/medic.model';
import { Hospital } from '../../models/hospital.model';
import { SearchService } from '../../services/service.index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  medics: Medic[] = [];
  hospitals: Hospital[] = [];

  constructor(public _activatedRoute: ActivatedRoute, public _searchService: SearchService) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe(({ term }) => {
      this.search(term);
    });
  }

  search(term: string) {
    this._searchService.searchAll(term).subscribe((resp) => {
      this.users = resp.users;
      this.medics = resp.medics;
      this.hospitals = resp.hospitals;
    });
  }
}
