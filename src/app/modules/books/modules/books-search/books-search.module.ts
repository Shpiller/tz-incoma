import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksSearchComponent} from './books-search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [BooksSearchComponent],
    exports: [BooksSearchComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ]
})
export class BooksSearchModule {
}
