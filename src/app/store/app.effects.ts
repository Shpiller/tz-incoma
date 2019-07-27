import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppActions} from './app.actions';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EMPTY} from 'rxjs';
import {ROUTER_NAVIGATED, RouterNavigationAction} from '@ngrx/router-store';
import {RouterStateUrl} from '../serializers/custom-route.serializer';
import {AppStore} from './app.store';
import {select, Store} from '@ngrx/store';

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
            withLatestFrom(this.store$.pipe(select(AppStore.Selects.app.books))),
            filter(([data, books]) => !books),
            map(() => {
                return new AppActions.GetBooks();
            })
        )
    );

    getList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.Types.GET_BOOKS),
            switchMap(() => {

                return this.http.get(
                    'volumes?q=test',
                ).pipe(
                    map(books => {
                        return new AppActions.GetBooksSuccess(books as any[]);
                    }),
                    catchError(() => EMPTY),
                );
            })
        )
    );
}
