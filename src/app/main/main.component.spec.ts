import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MainComponent } from "./main.component";

import { DataService, guid } from "../data.service";
import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";
import { Item, ItemType, ItemMode } from "../item/item.component";

describe("MainComponent", () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MainComponent],
        providers: [
          DataService,
          {
            provide: "SnotifyToastConfig",
            useValue: ToastDefaults
          },
          SnotifyService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should update payment mode to CREDIT CARD", () => {
    component.togglePaymentMode(false);
    expect(component.isPaymentCash).toBeFalsy();
  });

  it("should update payment mode to CASH", () => {
    component.togglePaymentMode(true);
    expect(component.isPaymentCash).toBeTruthy();
  });

  it('should prompt message "Sorry we dont have any...left" when selecting an item with 0 quantity ', () => {
    
    //ARRANGE
    let snotifyService = TestBed.get(SnotifyService);
    const fakecall = spyOn(snotifyService, "info").and.callFake((a) => null);
    const item = new Item(ItemType.OrangeJuice, ItemMode.Display, 0, guid());

    //ACT
    component.selectedItem(item);

    //ASSERT
    expect(fakecall).toHaveBeenCalledWith(
      `Sorry we don't have any ${item.name} left. Please pick a different one.`
    );
    expect(fakecall).toHaveBeenCalledTimes(1);
  });



  it('should purchase by cash when selecting an item with QTY and payment mode is CASH and item mode is DISPLAY', () => {
    
    //ARRANGE
    const item = new Item(ItemType.OrangeJuice, ItemMode.Display, 1, guid());
    const fakecall = spyOn(component, "purchaseByCash").and.callFake((a) => null);
    //ACT
    component.selectedItem(item);

    //ASSERT
    expect(fakecall).toHaveBeenCalledWith(
      item
    );
    expect(fakecall).toHaveBeenCalledTimes(1);
  });


  it('should purchase by card when selecting an item with QTY and payment mode is CARD and item mode is DISPLAY', () => {
    
    //ARRANGE
    const item = new Item(ItemType.OrangeJuice, ItemMode.Display, 1, guid());
    const fakecall = spyOn(component, "purchaseByCard").and.callFake((a) => null);
    component.togglePaymentMode(false);

    //ACT
    component.selectedItem(item);

    //ASSERT
    expect(fakecall).toHaveBeenCalledWith(
      item
    );
    expect(fakecall).toHaveBeenCalledTimes(1);
  });


  it('should be able to collect when selecting an item with an item mode of DISPENSED', () => {
    
    //ARRANGE
    const item = new Item(ItemType.OrangeJuice, ItemMode.Dispense, 1, guid());
    const fakecall = spyOn(component, "collectItem").and.callFake((a) => null);

    //ACT
    component.selectedItem(item);

    //ASSERT
    expect(fakecall).toHaveBeenCalledWith(
      item
    );
    expect(fakecall).toHaveBeenCalledTimes(1);
  });


  it('should prompt message "Dude you dont have money..." when selecting item and there is no cash in the machine', () => {
    
    //ARRANGE
    let snotifyService = TestBed.get(SnotifyService);
    const fakecall = spyOn(snotifyService, "error").and.callFake((a) => null);
    const item = new Item(ItemType.OrangeJuice, ItemMode.Display, 1, guid());

    //ACT
    component.purchaseByCash(item);

    //ASSERT
    expect(fakecall).toHaveBeenCalledWith(
      "Dude, You didn't insert any cash or your credit card info."
    );
    expect(fakecall).toHaveBeenCalledTimes(1);
  });



  it('should prompt message "Not enough cash..." when selecting item and there is not enough cash in the machine', () => {
    
    //ARRANGE
    let snotifyService = TestBed.get(SnotifyService);
    const fakecall = spyOn(snotifyService, "error").and.callFake((a) => null);
    const item = new Item(ItemType.OrangeJuice, ItemMode.Display, 1, guid());
    component.totalCash = 1;

    //ACT
    component.purchaseByCash(item);

    //ASSERT
    expect(fakecall).toHaveBeenCalledWith(
      "Not enough cash dude!"
    );
    expect(fakecall).toHaveBeenCalledTimes(1);
  });



  it('should dispense item when purchasing by CASH and there is enough cash in the machine', () => {
    
    //ARRANGE
    const item = new Item(ItemType.OrangeJuice, ItemMode.Display, 1, guid());
    const fakecall = spyOn(component, "dispenseItem").and.callFake((a,b) => null);
    component.totalCash = 20;

    //ACT
    component.purchaseByCash(item);

    //ASSERT
    expect(fakecall).toHaveBeenCalledWith(
      item,true
    );
    expect(fakecall).toHaveBeenCalledTimes(1);
  });


  it('should dispense item when purchasing by CARD and there are valid card name and number', () => {
    
    //ARRANGE
    const item = new Item(ItemType.OrangeJuice, ItemMode.Display, 1, guid());
    const fakecall = spyOn(component, "dispenseItem").and.callFake((a,b) => null);
    component.cardName = 'Sample Name';
    component.cardNumber = 'Sample Number';

    //ACT
    component.purchaseByCard(item);

    //ASSERT
    expect(fakecall).toHaveBeenCalledWith(
      item,false
    );
    expect(fakecall).toHaveBeenCalledTimes(1);
  });


});
