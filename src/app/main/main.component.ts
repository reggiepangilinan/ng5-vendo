import { Component, OnInit } from "@angular/core";
import { Item, ItemType, ItemMode } from "../item/item.component";
import { DataService, guid, roundOffNumber } from "../data.service";
import { SnotifyService } from "ng-snotify";
import { Sale, SalesType } from "../sales/sales.component";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  sales : Sale[] = [];
  itemsForDisplay: Item[] = [];
  itemsDispensed: Item[] = [];
  isPaymentCash: boolean = true;
  totalCash: number = 0;
  totalChange: number = 0;
  cardPurchase : number = 0;
  cardName : string = "";
  cardNumber : string = "";

  constructor(
    private _data: DataService,
    private _snotifyService: SnotifyService
  ) {

  }


  ngOnInit() {
    this._data.sales.subscribe(res => (this.sales = res));
    this._data.fordisplay.subscribe(res => (this.itemsForDisplay = res));
    this._data.dispensed.subscribe(res => (this.itemsDispensed = res));
    this._data.getCash().subscribe(res => (this.totalCash = res));
    this._data.change.subscribe(res => (this.totalChange = res));
    this._data.cardName.subscribe(res=> this.cardName = res);
    this._data.cardNumber.subscribe(res=> this.cardNumber = res);
    this._data.cardPurchase.subscribe(res=> this.cardPurchase = res);
  }

  togglePaymentMode(value: boolean): void {
    this.isPaymentCash = value;
  }

  selectedItem(item: Item): void {
    switch (item.itemMode) {
      case ItemMode.Display:
        //VALIDATE QTY
        if (item.qty <= 0) {
          this._snotifyService.info(
            `Sorry we don't have any ${
              item.name
            } left. Please pick a different one.`
          );
        } else {
          if (this.isPaymentCash) {
            //Purchase Item by Cash
            this.purchaseByCash(item);
          } else {
            //Purchase Item by Credit Card
            this.purchaseByCard(item);
          }
        }

        break;

      case ItemMode.Dispense:
        this.collectItem(item);
        break;
    }
  }

  purchaseByCash(item: Item): void {
    //VALIDATE CASH
    if (this.totalCash <= 0) {
      this._snotifyService.error(
        "Dude, You didn't insert any cash or your credit card info."
      );
      return;
    }

    //VALIDATE PRICE
    if (this.totalCash < item.price) {
      this._snotifyService.error("Not enough cash dude!");
      return;
    }
    //DISPENSE ITEM
    this.dispenseItem(item,true);
  }

  purchaseByCard(item: Item): void {
    //VALIDATE CARD DETAILS
    if(this.cardName && this.cardNumber)    
        this.dispenseItem(item,false);
    else
      this._snotifyService.error("Invalid credit card info.");
  }

  dispenseItem(item: Item, isPaymentCash: boolean): void {

    //DISPENSE ITEM
    const selectedItemInList = this.itemsForDisplay.find(
      x => x.itemType == item.itemType
    );
    selectedItemInList.qty--;
    const itemsales = new Item(item.itemType, ItemMode.Dispense, 1, guid())
    this.itemsDispensed.push(itemsales);
    this._data.updateItemsForDisplay(this.itemsForDisplay);
    this._data.updateItemsDispensed(this.itemsDispensed);

    //UPDATE SALES
    this.sales.push(new Sale(itemsales,isPaymentCash? SalesType.Cash : SalesType.Card));

    //CASH PAYMENT
    if (isPaymentCash) {
      this.totalChange = roundOffNumber(
        this.totalChange + this.totalCash - selectedItemInList.price
      );
      this.totalCash = 0;
      this._data.updateCashInMachine(this.totalCash);
      this._data.updateChangeInMachine(this.totalChange);
      this._snotifyService.success(
        `'${item.name}' Dispensed. You have a change of $ ${this.totalChange}`
      );
    } else {
    //CARD PAYMENT
        this.cardPurchase = roundOffNumber(
          this.cardPurchase + selectedItemInList.price
        );
        this._data.updateCardPurchaseAmount(this.cardPurchase);

        this._snotifyService.success(
          `'${item.name}' Dispensed. Your total card purchase is $ ${this.cardPurchase}`
        );
    }
  }

  collectItem(item: Item): void {
    const index = this.itemsDispensed.findIndex(x => x.uuid == item.uuid);
    this.itemsDispensed.splice(index, 1);
    this._data.updateItemsDispensed(this.itemsDispensed);
    this._snotifyService.success(`'${item.name}' Collected`);
  }
}
