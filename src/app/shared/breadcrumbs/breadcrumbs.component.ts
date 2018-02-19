import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor(
    private roter: Router,
    public title: Title,
    public meta: Meta
   ) {
    this.getDataRoute().subscribe( data => {
      this.label = data.titulo;
      title.setTitle(data.titulo);
      let metaTag: MetaDefinition = {
        name: 'description',
        content: this.label

      }
      this.meta.updateTag(metaTag);
      console.log(data);

    });
  }

  getDataRoute() {
    return this.roter.events
    .filter( evento => evento instanceof ActivationEnd )
    .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null )
    .map( (evento: ActivationEnd) => evento.snapshot.data);
  }

  ngOnInit() {
  }

}
