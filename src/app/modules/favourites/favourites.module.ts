import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavouritesComponent} from './favourites.component';
import {BookCardModule} from '../book-card/book-card.module';


@NgModule({
    declarations: [FavouritesComponent],
    exports: [FavouritesComponent],
    imports: [
        CommonModule,
        BookCardModule,
    ]
})
export class FavouritesModule {
}
