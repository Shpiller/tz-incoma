import {ChangeDetectionStrategy, Component, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit, OnChanges {

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

}
