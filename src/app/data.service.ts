import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Item, ItemType, ItemMode } from "./item/item.component";
import { Sale, SalesType } from "./sales/sales.component";

@Injectable()
export class DataService {
  // ITEMS FOR DISPLPAY
  private itemsForDisplay = new BehaviorSubject<Item[]>([
    new Item(ItemType.BubbleTea, ItemMode.Display, 5, guid()),
    new Item(ItemType.Cognac, ItemMode.Display, 4, guid()),
    new Item(ItemType.GermanBeer, ItemMode.Display, 3, guid()),
    new Item(ItemType.Milk, ItemMode.Display, 2, guid()),
    new Item(ItemType.OrangeJuice, ItemMode.Display, 1, guid()),
    new Item(ItemType.PopSoda, ItemMode.Display, 0, guid()),
    new Item(ItemType.PremiumCoffee, ItemMode.Display, 2, guid()),
    new Item(ItemType.PremiumMilk, ItemMode.Display, 3, guid()),
    new Item(ItemType.PurpleWine, ItemMode.Display, 4, guid()),
    new Item(ItemType.RedLiquor, ItemMode.Display, 5, guid())
  ]);
  fordisplay = this.itemsForDisplay.asObservable();

  // ITEMS DISPENSED
  private itemsDispensed = new BehaviorSubject<Item[]>([
    // new Item(ItemType.PremiumCoffee, ItemMode.Dispense, 0,guid()),
    // new Item(ItemType.PremiumMilk, ItemMode.Dispense, 0,guid()),
    // new Item(ItemType.PurpleWine, ItemMode.Dispense, 0,guid()),
    // new Item(ItemType.RedLiquor, ItemMode.Dispense, 0,guid())
  ]);
  dispensed = this.itemsDispensed.asObservable();

  //Cash in Vendo Machine
  private cashInMachine = new BehaviorSubject<number>(0);
  cash = this.cashInMachine.asObservable();

  //Cash in Vendo Machine
  private changeInMachine = new BehaviorSubject<number>(0);
  change = this.changeInMachine.asObservable();

  //PaymentCash
  private isPaymentCash = new BehaviorSubject<boolean>(true);
  paymentcash = this.isPaymentCash.asObservable();

  //Credit Card Name
  private creditCardName = new BehaviorSubject<string>("");
  cardName = this.creditCardName.asObservable();

  //Credit Card Number
  private creditCardNumber = new BehaviorSubject<string>("");
  cardNumber = this.creditCardNumber.asObservable();

  //Credit Card Purchase
  private creditCardPurchaseAmount = new BehaviorSubject<number>(0);
  cardPurchase = this.creditCardPurchaseAmount.asObservable();

  //Sales
  private itemSales = new BehaviorSubject<Sale[]>([]);
  sales = this.itemSales.asObservable();


  constructor() {}

  updateSales(newSales: Sale[]) {
    this.itemSales.next(newSales);
  }

  updateItemsForDisplay(newItemsForDisplay: Item[]) {
    this.itemsForDisplay.next(newItemsForDisplay);
  }

  updateItemsDispensed(newItemsDispensed: Item[]) {
    this.itemsDispensed.next(newItemsDispensed);
  }

  updateCashInMachine(newCashInMachine: number) {
    this.cashInMachine.next(newCashInMachine);
  }

  updateChangeInMachine(newChangeInMachine: number) {
    this.changeInMachine.next(newChangeInMachine);
  }

  updateIsPaymentCash(newValue : boolean) {
    this.isPaymentCash.next(newValue);
  }

  updateCardName(newValue : string) {
    this.creditCardName.next(newValue);
  }

  updateCardNumber(newValue : string) {
    this.creditCardNumber.next(newValue);
  }

  updateCardPurchaseAmount(newValue : number) {
    this.creditCardPurchaseAmount.next(newValue);
  }


}

//GUID for each item
export function guid() : string {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

export function roundOffNumber(value : number) : number {
  return Math.round(
    (value) * 100
  ) / 100;
}
