import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuUserComponent } from './role-menu-user.component';

describe('RoleMenuUserComponent', () => {
  let component: RoleMenuUserComponent;
  let fixture: ComponentFixture<RoleMenuUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleMenuUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMenuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
