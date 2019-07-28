import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';

export namespace AppStore {

    export interface IState {
        router: RouterReducerState;
    }

    export const reducers: ActionReducerMap<IState> = {
        router: routerReducer,
    };

    export namespace Selects {

        export const router = createFeatureSelector<IState, RouterReducerState<any>>('router');
    }

    export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];

}
