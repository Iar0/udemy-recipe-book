import { routing } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';

import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import {CodeModule} from "./code.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
      HttpModule,
      CodeModule
  ],
  providers: [
    RecipeService,
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
