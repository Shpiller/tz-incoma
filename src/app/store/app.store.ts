import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {AppReducer} from './app.reducer';

export namespace AppStore {

    export const SERVICE_LOADING = {
        GET_BOOKS: '[AppStore][SERVICE_LOADING] GET_BOOKS',
        GET_NEXT_BOOKS_PAGE: '[AppStore][SERVICE_LOADING] GET_NEXT_BOOKS_PAGE',
    };

    export interface IState {
        router: RouterReducerState;
        app: AppReducer.IState;
    }

    export const reducers: ActionReducerMap<IState> = {
        router: routerReducer,
        app: AppReducer.reducer,
    };

    export namespace Selects {

        export const router = createFeatureSelector<IState, RouterReducerState<any>>('router');
        export const app = AppReducer.createStoreSelector((state: IState) => state.app);
    }

    export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];

}
