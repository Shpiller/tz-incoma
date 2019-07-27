import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {BooksInterfaces} from './interfaces/books.interfaces';
import {select, Store} from '@ngrx/store';
import {AppStore} from '../../store/app.store';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit, OnChanges, OnDestroy {

    query: string;
    books: BooksInterfaces.IVolume[];

    private subscriptions: Subscription[] = [];

    set subs(sub) {
        this.subscriptions.push(sub);
    }

    constructor(private store$: Store<AppStore.IState>,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {

        this.initSubscriptions();
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    private initSubscriptions() {

        this.subs = this.store$.pipe(
            select(AppStore.Selects.app.query),
            map(query => {
                this.query = query;
                this.cdr.detectChanges();
            })
        ).subscribe();

        this.subs = this.store$.pipe(
            select(AppStore.Selects.app.books),
            map(books => {
                this.books = books;
                this.cdr.detectChanges();
            }),
        ).subscribe();
    }

}
