import {Injectable, EventEmitter} from '@angular/core';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import {Headers, Http, Response} from "@angular/http";

import "rxjs";

@Injectable()
export class RecipeService {

    recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Incubi di R'Iyeh",
      'Canto',
      'http://www.metaplay.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/s/d/sdl2-it_incubi-di-rlyeh_furia-di-riyeh_10-12_force-of-will_metaplay.jpg',
      [
        new Ingredient(
          'French Fries',
          2
        ),
        new Ingredient(
          'Ketchup',
          1
        )
      ]
    ),
    new Recipe(
      "Azathoth",
      'Risonatore',
      'http://fowtcg.com/wp-content/uploads/2016/08/TheWholePlanetIsOnACob.png',
      [
        new Ingredient(
          'French Fries 2',
          2
        ),
        new Ingredient(
          'Ketchup 2',
          1
        )
      ]
    ),
  ];

  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
      return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
      this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  deleteRecipe(recipe: Recipe){
      this.recipes.splice(this.recipes.indexOf(recipe),1);
  }

  storeRecipes() {
      const body = JSON.stringify(this.recipes);
      const headers = new Headers();
      headers.append('Content-Type','Application/json');

      return this.http.put(
          'https://udemyrecipebook.firebaseio.com/recipes.json',
          body,
          {
              headers: headers
          }
      )
  }

  fetchRecipes() {
      this.http.get('https://udemyrecipebook.firebaseio.com/recipes.json')
          .map((response: Response) => response.json())
          .subscribe(
              (data: Recipe[]) => {
                  this.recipes = data;
                  this.recipesChanged.emit(this.recipes);
              }
          )
  }
}
