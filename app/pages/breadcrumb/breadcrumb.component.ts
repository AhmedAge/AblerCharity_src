import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  path: string;
  pages: string[];

  constructor() { }

  ngOnInit() {
    this.path += "asd";
    this.pages = this.path.split('/');
    
  }

}
