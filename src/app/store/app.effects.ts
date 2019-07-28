import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppActions, AppActionsTypes} from './app.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {BooksInterfaces} from '../modules/books/interfaces/books.interfaces';
import {BooksService} from '../services/books/books.service';
import {AppStore} from './app.store';
import {CommonInterfaces} from '../interfaces/common.interfaces';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions,
                private booksService: BooksService) {
    }

    getBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActionsTypes.GET_BOOKS),
            map((action: AppActions.GetBooks) => action.payload),
            switchMap(query => {

                if (!query) {
                    return of(new AppActions.GetBooksSuccess(null));
                } else {
                    return this.booksService.getBooks(query)
                        .pipe(
                            map(books => {
                                return new AppActions.GetBooksSuccess(books as BooksInterfaces.IListResponse);
                            }),
                            catchError(() => of(new AppActions.GetBooksFailed())),
                        );
                }
            })
        )
    );

    serviceLoading$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActionsTypes.GET_BOOKS, AppActionsTypes.GET_BOOKS_SUCCESS, AppActionsTypes.GET_BOOKS_FAILED),
            map((action: AppActions.GetBooks | AppActions.GetBooksSuccess) => {

                const flags: CommonInterfaces.IMapOfBoolean = {};
                flags[AppStore.SERVICE_LOADING.GET_BOOKS] = action.type === AppActionsTypes.GET_BOOKS;

                return new AppActions.PatchServiceLoading(flags);
            }),
        )
    );
}
