import {BooksReducer} from './books.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStore} from '../../../store/app.store';

export namespace BooksStore {

    export const FEATURE_UID = '[BooksStore] FEATURE_UID';

    export const SERVICE_LOADING = {
        GET_BOOKS: '[AppStore][SERVICE_LOADING] GET_BOOKS',
        GET_NEXT_BOOKS_PAGE: '[AppStore][SERVICE_LOADING] GET_NEXT_BOOKS_PAGE',
    };

    interface IStore {
        selfStore: BooksReducer.IState;
    }

    export interface IState extends AppStore.IState {
        booksStore: IStore;
    }

    export const mapReducers: ActionReducerMap<IStore> = {
        selfStore: BooksReducer.reducer,
    };

    export namespace Selects {

        const featureSelector = createFeatureSelector<IStore>(FEATURE_UID);

        // self

        const selfSelector = createSelector(
            featureSelector,
            (state: IStore) => state.selfStore,
        );

        export const self = BooksReducer.createStoreSelector(selfSelector);


    }


}
