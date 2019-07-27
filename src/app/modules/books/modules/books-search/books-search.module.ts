import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksSearchComponent} from './books-search.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [BooksSearchComponent],
    exports: [BooksSearchComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class BooksSearchModule {
}
