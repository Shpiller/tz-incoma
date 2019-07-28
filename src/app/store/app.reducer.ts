import {AppActions, AppActionsTypes} from './app.actions';
import {createSelector} from '@ngrx/store';
import {BooksInterfaces} from '../modules/books/interfaces/books.interfaces';
import {CommonInterfaces} from '../interfaces/common.interfaces';

export namespace AppReducer {

    export interface IState {
        query: string;
        booksResponse: BooksInterfaces.IListResponse;
        serviceLoading: CommonInterfaces.IMapOfBoolean;
    }

    export interface ISelects {
        query: (state: IState) => string;
        booksResponse: (state: IState) => BooksInterfaces.IListResponse;
        serviceLoading: (state: IState) => CommonInterfaces.IMapOfBoolean;
    }

    export function createStoreSelector(selector) {

        class Self implements ISelects {
            query = createSelector(selector, ((state: IState) => state.query));
            booksResponse = createSelector(selector, ((state: IState) => state.booksResponse));
            serviceLoading = createSelector(selector, ((state: IState) => state.serviceLoading));
        }

        return new Self();
    }

    const initialState: IState = {
        query: null,
        booksResponse: null,
        serviceLoading: null,
    };

    export function reducer(state = initialState, action: AppActions.All): IState {

        switch (action.type) {

            case AppActionsTypes.PATCH_SERVICE_LOADING: {

                const serviceLoading = {
                    ...state.serviceLoading,
                    ...action.payload,
                };

                return {
                    ...state,
                    serviceLoading,
                };
            }

            case AppActionsTypes.GET_BOOKS: {

                return {
                    ...state,
                    query: action.payload,
                };
            }

            case AppActionsTypes.GET_BOOKS_SUCCESS: {

                const booksResponse = action.payload ? {...action.payload} : null;

                return {
                    ...state,
                    booksResponse,
                };
            }

            default: {
                return state;
            }
        }
    }
}
