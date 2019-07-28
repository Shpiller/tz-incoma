import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {BooksService} from '../services/books/books.service';
import {BooksActions, BooksActionTypes} from './books.actions';
import {of} from 'rxjs';
import {CommonInterfaces} from '../../../interfaces/common.interfaces';
import {BooksStore} from './books.store';
import {BooksInterfaces} from '../interfaces/books.interfaces';
import {select, Store} from '@ngrx/store';

@Injectable()
export class BooksEffects {

    constructor(private actions$: Actions,
                private booksService: BooksService,
                private store$: Store<BooksStore.IState>) {
    }

    getBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActionTypes.GET_BOOKS),
            map((action: BooksActions.GetBooks) => action.payload),
            switchMap(query => {

                if (!query) {
                    return of(new BooksActions.GetBooksSuccess(null));
                } else {
                    return this.booksService.getBooks(query)
                        .pipe(
                            map(books => {
                                return new BooksActions.GetBooksSuccess(books as BooksInterfaces.IListResponse);
                            }),
                            catchError(() => of(new BooksActions.GetBooksFailed())),
                        );
                }
            })
        )
    );

    serviceLoadingBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActionTypes.GET_BOOKS, BooksActionTypes.GET_BOOKS_SUCCESS, BooksActionTypes.GET_BOOKS_FAILED),
            map((action: BooksActions.GetBooks | BooksActions.GetBooksSuccess | BooksActions.GetBooksFailed) => {

                const flags: CommonInterfaces.IMapOfBoolean = {};
                flags[BooksStore.SERVICE_LOADING.GET_BOOKS] = action.type === BooksActionTypes.GET_BOOKS;
                flags[BooksStore.SERVICE_LOADING.GET_NEXT_BOOKS_PAGE] = false;

                return new BooksActions.PatchServiceLoading(flags);
            }),
        )
    );

    getNextBooksPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActionTypes.GET_NEXT_BOOKS_PAGE),
            withLatestFrom(
                this.store$.pipe(select(BooksStore.Selects.self.query)),
                this.store$.pipe(select(BooksStore.Selects.self.booksResponse)),
            ),
            filter(([action, query, booksResponse]) => booksResponse && booksResponse.totalItems > booksResponse.items.length),
            concatMap(([action, query, booksResponse]) => {

                return this.booksService.getBooks(query, booksResponse.items.length)
                    .pipe(
                        withLatestFrom(
                            this.store$.pipe(select(BooksStore.Selects.self.serviceLoading))
                        ),
                        filter(([books, serviceLoading]) => {
                            return serviceLoading[BooksStore.SERVICE_LOADING.GET_NEXT_BOOKS_PAGE];
                        }),
                        map(([books]) => {
                            return new BooksActions.GetNextBooksPageSuccess((books as BooksInterfaces.IListResponse).items);
                        }),
                        catchError(() => of(new BooksActions.GetNextBooksPageFailed())),
                    );
            }),
        )
    );

    serviceLoadingNextBooksPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                BooksActionTypes.GET_NEXT_BOOKS_PAGE,
                BooksActionTypes.GET_NEXT_BOOKS_PAGE_SUCCESS,
                BooksActionTypes.GET_NEXT_BOOKS_PAGE_FAILED
            ),
            map((action: BooksActions.GetNextBooksPage | BooksActions.GetNextBooksPageSuccess | BooksActions.GetNextBooksPageFailed) => {

                const flags: CommonInterfaces.IMapOfBoolean = {};
                flags[BooksStore.SERVICE_LOADING.GET_NEXT_BOOKS_PAGE] = action.type === BooksActionTypes.GET_NEXT_BOOKS_PAGE;

                return new BooksActions.PatchServiceLoading(flags);
            }),
        )
    );
}
