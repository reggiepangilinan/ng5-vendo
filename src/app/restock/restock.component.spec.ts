import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RestockComponent } from './restock.component';

import { DataService } from '../data.service';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';



describe('RestockComponent', () => {
  let component: RestockComponent;
  let fixture: ComponentFixture<RestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestockComponent ],
      providers: 
      [
        DataService,
        {  
          provide: "SnotifyToastConfig",
          useValue: ToastDefaults,
        },
        SnotifyService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
