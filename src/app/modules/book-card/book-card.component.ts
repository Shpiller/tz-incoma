import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BooksInterfaces} from '../books/interfaces/books.interfaces';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent implements OnInit {

    @Input() book: BooksInterfaces.IVolume;
    @Input() isFavourite: boolean;

    faHeart = faHeart;

    @Output() toggleFavourites: EventEmitter<void> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
