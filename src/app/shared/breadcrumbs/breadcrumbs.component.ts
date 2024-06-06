import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title!: string;
  constructor( private _router: Router, private _title: Title, private _meta: Meta) {

    this.getDataRoute().subscribe( event => {
      this.title = event['title'];
      this._title.setTitle(this.title);
      const metaTag: MetaDefinition = {
        name: 'decription',
        content: this.title
      };
      this._meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this._router.events
    .pipe(
      filter( (evento: any) => {
        return evento instanceof ActivationEnd && evento.snapshot.firstChild === null;
      }),
      map( (evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
