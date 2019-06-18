import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MenusInfo } from 'src/app/Interfaces/MenusInfo';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  path: string;
  pages: string[];

  private eventsSubscription: any

  @Input() events: Observable<string>;



  constructor() { }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((res) => this.doSomething(res))
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe()
  }

  doSomething(res) {
    //this.path += "asd";
    this.path = res;
    console.log("doSomething : " + res);
    this.pages = res.split('/');
    this.pages.splice(0, 1);
     
  } 
  
}