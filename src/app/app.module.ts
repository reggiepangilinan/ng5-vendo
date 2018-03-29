import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";

import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { RestockComponent } from "./restock/restock.component";
import { ItemComponent } from "./item/item.component";
import { CashComponent } from "./cash/cash.component";
import { CreditComponent } from "./credit/credit.component";
import { DataService } from "./data.service";

ToastDefaults.toast.position = "rightTop";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RestockComponent,
    ItemComponent,
    CashComponent,
    CreditComponent
  ],
  imports: [BrowserModule, AppRoutingModule, SnotifyModule],
  providers: [
    DataService,
    {
      
      provide: "SnotifyToastConfig",
      useValue: ToastDefaults,
    },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
