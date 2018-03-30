import { Component, OnInit } from "@angular/core";
import { Item } from "../item/item.component";
import { DataService, roundOffNumber } from "../data.service";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"]
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  itemsForDisplay: Item[] = [];
  constructor(private _data: DataService) {}
  ngOnInit() {
    this._data.sales.subscribe(res => (this.sales = res));
    this._data.fordisplay.subscribe(res => (this.itemsForDisplay = res));
  }

  getInventoryCount() : number {
    return this.itemsForDisplay.map(x=> x.qty).reduce((a,b)=> a+b,0);
  }

  getInventoryAmount() : number {
    return roundOffNumber(this.itemsForDisplay.map(x=> x.qty * x.price).reduce((a,b)=> a+b,0));
  }

  getTotalSales(): number {
    let totalSales = this.sales
      .map(x => x.item.price)
      .reduce((a, b) => a + b, 0);
    return roundOffNumber(totalSales);
  }

  getTotalSalesByCash(): number {
    let totalSales = this.sales
      .filter(y => y.salesType == SalesType.Cash)
      .map(x => x.item.price)
      .reduce((a, b) => a + b, 0);
    return roundOffNumber(totalSales);
  }

  getTotalSalesByCard(): number {
    let totalSales = this.sales
      .filter(y => y.salesType == SalesType.Card)
      .map(x => x.item.price)
      .reduce((a, b) => a + b, 0);
    return roundOffNumber(totalSales);
  }
}

export enum SalesType {
  Cash = 0,
  Card = 1
}

export class Sale {
  constructor(public item: Item, public salesType: SalesType) {}
}
