import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPermissionComponent } from './add-permission.component';

describe('AddPermissionComponent', () => {
  let component: AddPermissionComponent;
  let fixture: ComponentFixture<AddPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
