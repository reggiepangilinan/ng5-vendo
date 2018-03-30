import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {

  cardPurchase : number = 0;
  cardName : string = "";
  cardNumber : string = "";

  constructor(private _data : DataService, private _snotifyService: SnotifyService) {

   }

  ngOnInit() {
    this._data.cardName.subscribe(res=> this.cardName = res);
    this._data.cardNumber.subscribe(res=> this.cardNumber = res);
    this._data.cardPurchase.subscribe(res=> this.cardPurchase = res);
  }

  updateCardName(newValue : string) : void {
    this.cardName = newValue.trim();
    this._data.updateCardName(this.cardName);
  }

  updateCardNumber(newValue : string) : void {
    this.cardNumber = newValue.trim();
    this._data.updateCardNumber(this.cardNumber);
  }

  clearInfo() : void {
    this.updateCardName("");
    this.updateCardNumber("");
  }

  getReceipt() : void {
    this._snotifyService.success(`You got your receipt with a total purchase amount of $ ${this.cardPurchase}. Thank you!`);
    this.cardPurchase = 0;
    this._data.updateCardPurchaseAmount(this.cardPurchase);
    this.clearInfo();
  }

}
