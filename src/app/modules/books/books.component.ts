import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {BooksInterfaces} from './interfaces/books.interfaces';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {CommonInterfaces} from '../../interfaces/common.interfaces';
import {BooksActions} from './store/books.actions';
import {BooksStore} from './store/books.store';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit, OnChanges, OnDestroy {

    query: string;
    booksResponse: BooksInterfaces.IListResponse;
    serviceLoading: CommonInterfaces.IMapOfBoolean;

    private subscriptions: Subscription[] = [];

    set subs(sub) {
        this.subscriptions.push(sub);
    }

    get SERVICE_LOADING() {
        return BooksStore.SERVICE_LOADING;
    }

    constructor(private store$: Store<BooksStore.IState>,
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
            select(BooksStore.Selects.self.query),
            map(query => {
                this.query = query;
                this.cdr.detectChanges();
            })
        ).subscribe();

        this.subs = this.store$.pipe(
            select(BooksStore.Selects.self.booksResponse),
            map(books => {
                this.booksResponse = books;
                this.cdr.detectChanges();
            }),
        ).subscribe();

        this.subs = this.store$.pipe(
            select(BooksStore.Selects.self.serviceLoading),
            map(serviceLoading => {
                this.serviceLoading = serviceLoading;
                this.cdr.detectChanges();
            }),
        ).subscribe();
    }

    searchBooks(query: string) {
        this.store$.dispatch(new BooksActions.GetBooks(query));
    }

    getNextPage() {
        this.store$.dispatch(new BooksActions.GetNextBooksPage());
    }

}
