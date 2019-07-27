import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-books-search',
    templateUrl: './books-search.component.html',
    styleUrls: ['./books-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksSearchComponent implements OnInit, OnChanges {

    @Input() query: string;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

}
