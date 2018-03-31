import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    let defaultChange;
    service.change.subscribe(x=> defaultChange = x.valueOf());
    expect(defaultChange).toEqual(0);
    expect(service).toBeTruthy();
  }));


  it('should be created with default CHANGE to 0', inject([DataService], (service: DataService) => {
    let defaultValue;
    service.change.subscribe(x=> defaultValue = x);
    expect(defaultValue).toEqual(0);
  }));


  it('should be created with default CASH to 0', inject([DataService], (service: DataService) => {
    let defaultValue;
    service.cash.subscribe(x=> defaultValue = x);
    expect(defaultValue).toEqual(0);
  }));


  it('should be created with default CARD PURCHASE to 0', inject([DataService], (service: DataService) => {
    let defaultValue;
    service.cardPurchase.subscribe(x=> defaultValue = x);
    expect(defaultValue).toEqual(0);
  }));
  
  it('should be created with default CARD NAME to EMPTY STRING', inject([DataService], (service: DataService) => {
    let defaultValue;
    service.cardName.subscribe(x=> defaultValue = x);
    expect(defaultValue).toEqual('');
  }));

  it('should be created with default CARD NUMBER to EMPTY STRING', inject([DataService], (service: DataService) => {
    let defaultValue;
    service.cardNumber.subscribe(x=> defaultValue = x);
    expect(defaultValue).toEqual('');
  }));


  it('should be created with default FOR DISPLAY length to 10', inject([DataService], (service: DataService) => {
    let defaultValue;
    service.fordisplay.subscribe(x=> defaultValue = x);
    expect(defaultValue.length).toEqual(10);
  }));

  it('should be created with default DISPENSED length to 0', inject([DataService], (service: DataService) => {
    let defaultValue;
    service.dispensed.subscribe(x=> defaultValue = x);
    expect(defaultValue.length).toEqual(0);
  }));


  it('should be created with default PAYMENT to CASH', inject([DataService], (service: DataService) => {
    let defaultValue;
    service.paymentcash.subscribe(x=> defaultValue = x);
    expect(defaultValue).toEqual(true);
  }));


});
