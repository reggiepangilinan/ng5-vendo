import { Component, OnInit } from "@angular/core";
import { Item, ItemType, ItemMode } from "../item/item.component";
import { DataService, guid } from "../data.service";
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  itemsForDisplay: Item[] = [];
  itemsDispensed: Item[] = [];
  isPaymentCash: boolean = true;
  totalCash: number = 0;
  totalChange: number = 0;

  constructor(private _data: DataService, private _snotifyService: SnotifyService) {}

  ngOnInit() {
    this._data.fordisplay.subscribe(res => (this.itemsForDisplay = res));
    this._data.dispensed.subscribe(res => (this.itemsDispensed = res));
    this._data.cash.subscribe(res => (this.totalCash = res));
    this._data.change.subscribe(res => (this.totalChange = res));
  }

  togglePaymentMode(value: boolean): void {
    this.isPaymentCash = value;
  }

  selectedItem(item: Item): void {
    switch (item.itemMode) {
      case ItemMode.Display:
      //VALIDATE CASH
        if (this.totalCash <= 0) {
          this._snotifyService.error("Dude, You didn't insert any cash or your credit card info.");
          return;
        }

        //VALIDATE PRICE
        if (this.totalCash < item.price) {
          this._snotifyService.error("Not enough cash dude!");
          return;
        }

        //VALIDATE QTY
        if (item.qty <= 0) {
          this._snotifyService.info(
            `Sorry we don't have any ${
              item.name
            } left. Please pick a different one.`
          );
        } else {
          this.dispenseItem(item);
        }
        break;

      case ItemMode.Dispense:
        this.collectItem(item);
        break;
    }
  }

  dispenseItem(item: Item): void {
    const selectedItemInList = this.itemsForDisplay.find(
      x => x.itemType == item.itemType
    );
    selectedItemInList.qty--;

    this.totalChange =
      Math.round(
        (this.totalChange + this.totalCash - selectedItemInList.price) * 100
      ) / 100;
    this.totalCash = 0;
    this.itemsDispensed.push(
      new Item(item.itemType, ItemMode.Dispense, 0, guid())
    );

    this._data.updateItemsForDisplay(this.itemsForDisplay);
    this._data.updateItemsDispensed(this.itemsDispensed);
    this._data.updateCashInMachine(this.totalCash);
    this._data.updateChangeInMachine(this.totalChange);


    this._snotifyService.success(
      `'${
        item.name
      }' Dispensed. You have a change of $ ${this.totalChange}`
    );

  }

  collectItem(item: Item): void {

    const index = this.itemsDispensed.findIndex(x=> x.uuid == item.uuid);

    this.itemsDispensed.splice(index,1);

    this._data.updateItemsDispensed(this.itemsDispensed);

    this._snotifyService.success(
      `'${
        item.name
      }' Collected`
    );

  }
}
