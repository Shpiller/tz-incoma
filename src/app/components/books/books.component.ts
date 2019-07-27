import {ChangeDetectionStrategy, Component, OnChanges, OnInit} from '@angular/core';
import {BooksInterfaces} from './interfaces/books.interfaces';
import {Store} from '@ngrx/store';
import {AppStore} from '../../store/app.store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit, OnChanges {

    query$: Observable<string>;
    books: BooksInterfaces.IVolume[];

    constructor(private store$: Store<AppStore.IState>) {
    }

    ngOnInit() {

        this.initStoreData();
    }

    ngOnChanges() {
    }

    private initStoreData() {

    }

}
