import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactmanagerAppComponent } from './contactmanager-app.component';

describe('ContactmangerAppComponent', () => {
  let component: ContactmanagerAppComponent;
  let fixture: ComponentFixture<ContactmanagerAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactmanagerAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactmanagerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
