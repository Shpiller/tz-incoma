import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppActions, AppActionsTypes} from './app.actions';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {BooksInterfaces} from '../modules/books/interfaces/books.interfaces';
import {BooksService} from '../services/books/books.service';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions,
                private booksService: BooksService) {
    }

    getBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActionsTypes.GET_BOOKS),
            map((action: AppActions.GetBooks) => action.payload),
            filter(query => !!query),
            switchMap(query => {

                return this.booksService.getBooks(query)
                    .pipe(
                        map(books => {
                            return new AppActions.GetBooksSuccess(books as BooksInterfaces.IListResponse);
                        }),
                        catchError(() => EMPTY),
                    );
            })
        )
    );

    clearBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActionsTypes.GET_BOOKS),
            map((action: AppActions.GetBooks) => action.payload),
            filter(query => !query),
            map(query => {

                return new AppActions.GetBooksSuccess(null);
            })
        )
    );
}
