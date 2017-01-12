import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient';

import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {

  items: Ingredient[] = [];
  selectedItem: Ingredient =  null;

  constructor(
    private sls: ShoppingListService,
  ) { }

  ngOnInit() {
    this.items = this.sls.getItems();
  }

  onSelectedItem(item: Ingredient) {
    this.selectedItem = item;
  }

  onCleared() {
    this.selectedItem = null;
  }

}
