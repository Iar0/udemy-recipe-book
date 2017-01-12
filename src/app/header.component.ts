import { Component } from '@angular/core';
import {RecipeService} from "./recipes/recipe.service";

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) { }

  onStore() {
    this.recipeService.storeRecipes().subscribe(
        response => console.log(response),
        error => console.error(error)
    )
  }

  onFetch() {
    this.recipeService.fetchRecipes();
  }

}
