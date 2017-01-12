import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormArray, FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: []
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private recipeIndex: number;
  private isNew: boolean = true;
  private recipe: Recipe;

  recipeForm: FormGroup;

  constructor(
      private recipeService: RecipeService,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
        (params: any) => {
          if (params.hasOwnProperty('id')) {
            this.isNew = false;
            this.recipeIndex = +params['id'];
            this.recipe = this.recipeService.getRecipe(this.recipeIndex);
          } else {
            this.isNew = true;
            this.recipe = null;
          }
          this.initForm();
        }
    );
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onAddItem(name: HTMLInputElement, amount: HTMLInputElement) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
        new FormGroup({
          name: new FormControl(name.value, Validators.required),
          amount: new FormControl(amount.value, [
            Validators.required,
            Validators.pattern("\\d+")
          ])
        })
    );
    name.value = null;
    amount.value = null;
  }

  onRemoveItem(index: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['../']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew) {
      if (this.recipe.hasOwnProperty('ingredients')) {
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          recipeIngredients.push(
              new FormGroup({
                name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
                amount: new FormControl(this.recipe.ingredients[i].amount, [
                  Validators.required,
                  Validators.pattern("\\d+")
                ])
              })
          );
        }
      }
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients
    })

  }

}
