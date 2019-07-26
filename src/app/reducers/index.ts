import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';

export namespace AppStore {

    export interface State {
        router: RouterReducerState;
    }

    export const reducers: ActionReducerMap<State> = {
        router: routerReducer,
    };

    export namespace Selects {

        export const router = createFeatureSelector<State, RouterReducerState<any>>('router');


    }


    export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

}
