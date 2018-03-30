import { Component, OnInit } from "@angular/core";
import { DataService, roundOffNumber } from "../data.service";
import { Item } from "../item/item.component";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: "app-restock",
  templateUrl: "./restock.component.html",
  styleUrls: ["./restock.component.scss"]
})
export class RestockComponent implements OnInit {
  itemsForDisplay: Item[] = [];

  constructor(private _data: DataService, private _snotifyService: SnotifyService) {
  
  }

  ngOnInit() {
    this._data.fordisplay.subscribe(res => (this.itemsForDisplay = res));
    this._data.updateSales([]);
    this._snotifyService.info("All sales has been reset to ZERO");
  }

  getInventoryCount() : number {
    return this.itemsForDisplay.map(x=> x.qty).reduce((a,b)=> a+b,0);
  }

  getInventoryAmount() : number {
    return roundOffNumber(this.itemsForDisplay.map(x=> x.qty * x.price).reduce((a,b)=> a+b,0));
  }



  increment(item: Item): void {
    const selectedItemInList = this.itemsForDisplay.find(
      x => x.itemType == item.itemType
    );
    selectedItemInList.qty++;
    this._data.updateItemsForDisplay(this.itemsForDisplay);
  }

  decrement(item: Item): void {
    const selectedItemInList = this.itemsForDisplay.find(
      x => x.itemType == item.itemType
    );
    if (selectedItemInList.qty != 0) {
      selectedItemInList.qty--;
      this._data.updateItemsForDisplay(this.itemsForDisplay);
    }
  }
}
