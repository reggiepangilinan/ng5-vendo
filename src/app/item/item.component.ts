import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;
  @Output() selectedItem = new EventEmitter<Item>();
  constructor() { }

  ngOnInit() {

  }

  itemClicked(item: Item) : void {
    this.selectedItem.emit(item);
  }
}

export enum ItemMode {
  Display = 0,
  Dispense = 1
}


export enum ItemType {
  PopSoda = 0,
  GermanBeer = 1,
  RedLiquor = 2,
  Cognac,
  PurpleWine,
  PremiumCoffee,
  Milk,
  PremiumMilk,
  BubbleTea,
  OrangeJuice
}


export class Item {
  imgsrc: string = "";
  name : string  = "";
  price : number = 13.94;

  setImageSrc(itemType: ItemType): void {
    switch (itemType) {
      case ItemType.PopSoda:
        this.imgsrc = "assets/images/PopSoda.png";
        this.name = "Pop Soda";
        break;

      case ItemType.BubbleTea:
        this.imgsrc = "assets/images/BubbleTea.png";
        this.name = "Bubble Tea";
        break;

      case ItemType.Cognac:
        this.imgsrc = "assets/images/Cognac.png";
        this.name = "Cognac";
        break;

      case ItemType.GermanBeer:
        this.imgsrc = "assets/images/GermanBeer.png";
        this.name = "German Beer";
        break;

      case ItemType.Milk:
        this.imgsrc = "assets/images/Milk.png";
        this.name = "Milk";
        break;

      case ItemType.OrangeJuice:
        this.imgsrc = "assets/images/OrangeJuice.png";
        this.name = "Orange Juice";
        break;

      case ItemType.PremiumCoffee:
        this.imgsrc = "assets/images/PremiumCoffee.png";
        this.name = "Premium Coffee";
        break;

      case ItemType.PremiumMilk:
        this.imgsrc = "assets/images/PremiumMilk.png";
        this.name = "Premium Milk";
        break;

      case ItemType.PurpleWine:
        this.imgsrc = "assets/images/PurpleWine.png";
        this.name = "Purple Wine";
        break;

      case ItemType.RedLiquor:
        this.imgsrc = "assets/images/RedLiquor.png";
        this.name = "Red Liquor";
        break;
    }
  }

  constructor(public itemType: ItemType, public itemMode: ItemMode, public qty: number = 0,public uuid : string) {
    this.setImageSrc(itemType);
  }
}
