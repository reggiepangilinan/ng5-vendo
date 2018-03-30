import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent, Item, ItemType, ItemMode } from './item.component';
import { guid } from '../data.service';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = new Item(ItemType.BubbleTea,ItemMode.Display,1,guid());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should have price of 13.94', () => {
    expect(component.item.price).toEqual(13.94);
  });

  it('available items should have class .available', () => {
    const statusDe: DebugElement = fixture.debugElement;
    const divDe = statusDe.query(By.css('.status.available'));
    const div : HTMLElement = divDe.nativeElement;
    expect(div.textContent).toEqual("Available (1)");
  });


  it('out of stock items should have class .outofstock', () => {
    component.item = new Item(ItemType.BubbleTea,ItemMode.Display,0,guid());
    fixture.detectChanges();

    const statusDe: DebugElement = fixture.debugElement;
    const divDe = statusDe.query(By.css('.status.outofstock'));
    const div : HTMLElement = divDe.nativeElement;
    expect(div.textContent).toEqual("Available (0)");
  });


  it('dispensed item should hide .status', () => {
    component.item = new Item(ItemType.BubbleTea,ItemMode.Dispense,0,guid());
    fixture.detectChanges();
    const statusDe: DebugElement = fixture.debugElement;
    const divDe = statusDe.query(By.css('.status'));
    expect(divDe).toEqual(null);
  });



  it("selecting an item will emit the 'default item' value", () => {
    let item : Item;
    component.selectedItem.subscribe((value)=> item = value);
    const wrapperDe: DebugElement = fixture.debugElement;
    const divDe = wrapperDe.query(By.css('.wrapper'));
    divDe.triggerEventHandler('click', null);
    expect(item).toBeTruthy();
    expect(item.itemType).toBe(ItemType.BubbleTea);
    expect(item.itemMode).toBe(ItemMode.Display);
  });

});
