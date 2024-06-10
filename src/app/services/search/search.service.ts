import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GeneralSearchApi } from '../../models/api/search-api.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
  private searchUrl = environment.base_url + '/search/all';

  constructor(private _http: HttpClient) { }

  searchAll(term: string): Observable<GeneralSearchApi> {
    const url = `${this.searchUrl}/${term}`;
    return this._http.get<GeneralSearchApi>(url);
  }
}
