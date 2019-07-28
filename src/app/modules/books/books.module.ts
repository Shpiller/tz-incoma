import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksComponent} from './books.component';
import {BooksSearchModule} from './modules/books-search/books-search.module';
import {BooksStore} from './store/books.store';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BooksEffects} from './store/books.effects';
import {BookCardModule} from '../book-card/book-card.module';


@NgModule({
    declarations: [BooksComponent],
    exports: [BooksComponent],
    imports: [
        CommonModule,
        BooksSearchModule,
        StoreModule.forFeature(BooksStore.FEATURE_UID, BooksStore.mapReducers),
        EffectsModule.forFeature([
            BooksEffects,
        ]),
        BookCardModule,
    ]
})
export class BooksModule {
}
