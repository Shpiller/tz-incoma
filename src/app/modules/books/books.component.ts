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
import {DOCUMENT} from '@angular/common';
import {FavouritesService} from '../../services/favourites/favourites.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';

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
    favouritesMap: { [id: string]: BooksInterfaces.IVolume };

    faSpinner = faSpinner;

    private subscriptions: Subscription[] = [];

    set subs(sub) {
        this.subscriptions.push(sub);
    }

    constructor(private store$: Store<BooksStore.IState>,
                private cdr: ChangeDetectorRef,
                @Inject(DOCUMENT) private document: Document,
                @Inject(WINDOW) private window: Window,
                private favouritesService: FavouritesService) {
    }

    ngOnInit() {
        this.favouritesMap = this.favouritesService.favouritesMap;
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

        this.subs = fromEvent(this.window, 'mousewheel')
            .pipe(
                map((e: any) => e.wheelDelta),
                debounceTime(300),
                filter(wheelDelta => {

                    const heightToEnd = this.document.body.clientHeight - this.window.innerHeight - this.window.pageYOffset;

                    return wheelDelta < 0 && heightToEnd <= 0
                        && !this.getBooksLoading() && !this.getNextBooksPageLoading()
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

    toggleFavourites(book: BooksInterfaces.IVolume) {
        this.favouritesService.toggleFavourites(book);
    }

}
