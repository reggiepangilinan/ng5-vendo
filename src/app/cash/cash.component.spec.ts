import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CashComponent } from "./cash.component";
import { DataService } from "../data.service";
import { SnotifyService } from "ng-snotify";
import { of } from 'rxjs/observable/of';


let dataServiceStub = new DataService();

let snotifyServiceStub: Partial<SnotifyService>;
snotifyServiceStub = {};

describe("CashComponent", () => {
  let component: CashComponent;
  let fixture: ComponentFixture<CashComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CashComponent],
        providers: 
        [
          DataService,
          { provide: SnotifyService, useValue: snotifyServiceStub }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  //TODO: https://github.com/karma-runner/karma/issues/2919
  it("should create", () => {
    var dataService = fixture.debugElement.injector.get(DataService);
    //spyOn(dataServiceStub, 'getCash').and.returnValue(of(0));
    // spyOnProperty(dataServiceStub, 'change','get').and.returnValue(of(0));
    expect(component).toBeTruthy();
  });
});
