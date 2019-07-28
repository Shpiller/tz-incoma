import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookCardComponent} from './book-card.component';

@NgModule({
    declarations: [BookCardComponent],
    exports: [BookCardComponent],
    imports: [
        CommonModule
    ]
})
export class BookCardModule {
}
