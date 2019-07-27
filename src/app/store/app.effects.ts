import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppActions, AppActionsTypes} from './app.actions';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EMPTY} from 'rxjs';
import {ROUTER_NAVIGATED, RouterNavigationAction} from '@ngrx/router-store';
import {RouterStateUrl} from '../serializers/custom-route.serializer';
import {AppStore} from './app.store';
import {select, Store} from '@ngrx/store';
import {BooksInterfaces} from '../modules/books/interfaces/books.interfaces';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions,
                private http: HttpClient,
                private store$: Store<AppStore.IState>) {
    }

    router$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            map((action: RouterNavigationAction<RouterStateUrl>) => action.payload.routerState.data),
            filter(routerData => !!routerData.loadBooks),
            withLatestFrom(
                this.store$.pipe(select(AppStore.Selects.app.query)),
                this.store$.pipe(select(AppStore.Selects.app.books)),
            ),
            filter(([data, query, books]) => !books && !!query),
            map(([data, query, books]) => {
                return new AppActions.GetBooks(query);
            })
        )
    );

    getList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActionsTypes.GET_BOOKS),
            switchMap((action: AppActions.GetBooks) => {

                // TODO Move to service
                return this.http.get(
                    `volumes?q=${action.payload}`,
                ).pipe(
                    map(books => {
                        const items = (books as any).items as BooksInterfaces.IVolume[];
                        return new AppActions.GetBooksSuccess(items);
                    }),
                    catchError(() => EMPTY),
                );
            })
        )
    );
}
