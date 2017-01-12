import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {DropdownDirective} from "./dropdown.directive";

@NgModule({
    declarations: [
        HomeComponent,
        DropdownDirective
    ],
    exports: [DropdownDirective]
})
export class CodeModule {}