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

  breadCrumb: IBreadCrumb[] = [{ name: '', path: '' }];
  doSomething(res) { 
    this.pages = res.split('/');
    this.pages.splice(0, 1);
    this.breadCrumb = [{ name: '', path: '' }];
    try {
      
      var obj: IBreadCrumb = { path: '', name: '' };
     
      var obj1: IBreadCrumb = { path: '', name: '' };
      obj1.name = this.pages[1].toUpperCase();
      obj1.path = "/" + this.pages[0] + "/" + this.pages[1];
      this.breadCrumb.push(obj1);

      var obj2: IBreadCrumb = { path: '', name: '' };
      obj2.name = this.pages[2].toUpperCase();
      obj2.path = "/" + this.pages[0] + "/" + this.pages[1] + "/" + this.pages[2];
      this.breadCrumb.push(obj2);

      var obj3: IBreadCrumb = { path: '', name: '' };
      obj3.name = this.pages[3].toUpperCase();
      obj3.path = "/" + this.pages[0] + "/" + this.pages[1] + "/" + this.pages[2] + "/" + this.pages[3];
      this.breadCrumb.push(obj3);

    } catch (err) {

    }
  }

}
export interface IBreadCrumb {
  path: string;
  name: string;
}