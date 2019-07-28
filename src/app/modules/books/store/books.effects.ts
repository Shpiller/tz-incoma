import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {BooksService} from '../../../services/books/books.service';
import {BooksActions, BooksActionTypes} from './books.actions';
import {of} from 'rxjs';
import {CommonInterfaces} from '../../../interfaces/common.interfaces';
import {BooksStore} from './books.store';
import {BooksInterfaces} from '../interfaces/books.interfaces';

@Injectable()
export class BooksEffects {

    constructor(private actions$: Actions,
                private booksService: BooksService) {
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

    serviceLoading$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActionTypes.GET_BOOKS, BooksActionTypes.GET_BOOKS_SUCCESS, BooksActionTypes.GET_BOOKS_FAILED),
            map((action: BooksActions.GetBooks | BooksActions.GetBooksSuccess) => {

                const flags: CommonInterfaces.IMapOfBoolean = {};
                flags[BooksStore.SERVICE_LOADING.GET_BOOKS] = action.type === BooksActionTypes.GET_BOOKS;

                return new BooksActions.PatchServiceLoading(flags);
            }),
        )
    );

}
