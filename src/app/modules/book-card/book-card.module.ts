import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookCardComponent} from './book-card.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [BookCardComponent],
    exports: [BookCardComponent],
    imports: [
        CommonModule,
        FontAwesomeModule
    ]
})
export class BookCardModule {
}
