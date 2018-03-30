import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {

  totalCash : number = 0;
  totalChange : number = 0;

  constructor(private _data : DataService, private _snotifyService: SnotifyService) { }

  ngOnInit() {
    this._data.getCash().subscribe(res=> this.totalCash = res);
    this._data.change.subscribe(res=> this.totalChange = res);
  }

  insertCash(amount : number) : void {
    this.totalCash = this.totalCash + amount;
    this._data.updateCashInMachine(this.totalCash);

    this._snotifyService.info(`You inserted $ ${amount} cash. You now have a total of ${this.totalCash}`);
  }

  clearChange() : void {

    this._snotifyService.info(`You got $ ${this.totalChange} back.`);

    this.totalChange = 0;
    this._data.updateChangeInMachine(this.totalChange);

    
  }

}
