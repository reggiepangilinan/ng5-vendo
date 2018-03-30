import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Item } from "../item/item.component";

@Component({
  selector: "app-restock",
  templateUrl: "./restock.component.html",
  styleUrls: ["./restock.component.scss"]
})
export class RestockComponent implements OnInit {
  itemsForDisplay: Item[] = [];

  constructor(private _data: DataService) {}

  ngOnInit() {
    this._data.fordisplay.subscribe(res => (this.itemsForDisplay = res));
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
