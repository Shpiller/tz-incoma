import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppActions, AppActionsTypes} from './app.actions';
import {catchError, first, map, switchMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
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
            switchMap(query => {

                if (!query) {
                    return of(new AppActions.GetBooksSuccess(null)).pipe(first());
                } else {
                    return this.booksService.getBooks(query)
                        .pipe(
                            map(books => {
                                return new AppActions.GetBooksSuccess(books as BooksInterfaces.IListResponse);
                            }),
                            catchError(() => EMPTY),
                        );
                }
            })
        )
    );
}
