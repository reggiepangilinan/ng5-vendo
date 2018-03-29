import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Item, ItemType, ItemMode } from "./item/item.component";

@Injectable()
export class DataService {
  // ITEMS FOR DISPLPAY
  private itemsForDisplay = new BehaviorSubject<Item[]>([
    new Item(ItemType.BubbleTea, ItemMode.Display, 5,guid()),
    new Item(ItemType.Cognac, ItemMode.Display, 4,guid()),
    new Item(ItemType.GermanBeer, ItemMode.Display, 3,guid()),
    new Item(ItemType.Milk, ItemMode.Display, 2,guid()),
    new Item(ItemType.OrangeJuice, ItemMode.Display, 1,guid()),
    new Item(ItemType.PopSoda, ItemMode.Display, 0,guid()),
    new Item(ItemType.PremiumCoffee, ItemMode.Display, 2,guid()),
    new Item(ItemType.PremiumMilk, ItemMode.Display, 3,guid()),
    new Item(ItemType.PurpleWine, ItemMode.Display, 4,guid()),
    new Item(ItemType.RedLiquor, ItemMode.Display, 5,guid())
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


  constructor() {}

  updateItemsForDisplay(newItemsForDisplay) {
    this.itemsForDisplay.next(newItemsForDisplay);
  }

  updateItemsDispensed(newItemsDispensed) {
    this.itemsDispensed.next(newItemsDispensed);
  }

  updateCashInMachine(newCashInMachine) {
    this.cashInMachine.next(newCashInMachine);
  }

  updateChangeInMachine(newChangeInMachine) {
    this.changeInMachine.next(newChangeInMachine);
  }

}


export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
