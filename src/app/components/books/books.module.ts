import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksComponent} from './books.component';
import {BooksSearchModule} from './components/books-search/books-search.module';


@NgModule({
    declarations: [BooksComponent],
    exports: [BooksComponent],
    imports: [
        CommonModule,
        BooksSearchModule,
    ]
})
export class BooksModule {
}
