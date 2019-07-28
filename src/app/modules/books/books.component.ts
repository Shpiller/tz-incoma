import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnChanges,
    OnDestroy,
    OnInit
} from '@angular/core';
import {BooksInterfaces} from './interfaces/books.interfaces';
import {select, Store} from '@ngrx/store';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, filter, map} from 'rxjs/operators';
import {CommonInterfaces} from '../../interfaces/common.interfaces';
import {BooksActions} from './store/books.actions';
import {BooksStore} from './store/books.store';
import {WINDOW} from '../../providers/window.providers';

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

    constructor(private store$: Store<BooksStore.IState>,
                private cdr: ChangeDetectorRef,
                @Inject(WINDOW) private window: Window) {
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

        // TODO Down scroll
        this.subs = fromEvent(this.window, 'scroll')
            .pipe(
                debounceTime(300),
                filter(() => {
                    return !this.getBooksLoading() && !this.getNextBooksPageLoading()
                        && this.booksResponse && this.booksResponse.totalItems > this.booksResponse.items.length;
                }),
                map(() => {
                    this.store$.dispatch(new BooksActions.GetNextBooksPage());
                }),
            ).subscribe();
    }

    searchBooks(query: string) {
        this.store$.dispatch(new BooksActions.GetBooks(query));
    }

    getNextPage() {
        this.store$.dispatch(new BooksActions.GetNextBooksPage());
    }

    getBooksLoading() {
        return this.serviceLoading && this.serviceLoading[BooksStore.SERVICE_LOADING.GET_BOOKS];
    }

    getNextBooksPageLoading() {
        return this.serviceLoading && this.serviceLoading[BooksStore.SERVICE_LOADING.GET_NEXT_BOOKS_PAGE];
    }

}
