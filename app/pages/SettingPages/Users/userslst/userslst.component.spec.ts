import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserslstComponent } from './userslst.component';

describe('UserslstComponent', () => {
  let component: UserslstComponent;
  let fixture: ComponentFixture<UserslstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserslstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserslstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
