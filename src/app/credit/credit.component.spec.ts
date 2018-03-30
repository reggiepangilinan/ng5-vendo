import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreditComponent } from './credit.component';
import { DataService } from '../data.service';
import { SnotifyService } from 'ng-snotify';



let snotifyServiceStub: Partial<SnotifyService>;
snotifyServiceStub = {};

describe('CreditComponent', () => {
  let component: CreditComponent;
  let fixture: ComponentFixture<CreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditComponent ],
      imports : [FormsModule],
      providers: 
      [
        DataService,
        { provide: SnotifyService, useValue: snotifyServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
