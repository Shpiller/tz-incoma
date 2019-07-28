import {createSelector, MemoizedSelector} from '@ngrx/store';
import {BooksActions, BooksActionTypes} from './books.actions';
import {BooksInterfaces} from '../interfaces/books.interfaces';
import {CommonInterfaces} from '../../../interfaces/common.interfaces';

export namespace BooksReducer {

    export interface IState {
        query: string;
        booksResponse: BooksInterfaces.IListResponse;
        serviceLoading: CommonInterfaces.IMapOfBoolean;
    }

    const initialState: IState = {
        query: null,
        booksResponse: null,
        serviceLoading: null,
    };

    export interface ISelects {
        query: (state: IState) => string;
        booksResponse: (state: IState) => BooksInterfaces.IListResponse;
        serviceLoading: (state: IState) => CommonInterfaces.IMapOfBoolean;
    }

    export function createStoreSelector(selector: MemoizedSelector<object, IState>) {

        class Selects implements ISelects {
            query = createSelector(selector, ((state: IState) => state.query));
            booksResponse = createSelector(selector, ((state: IState) => state.booksResponse));
            serviceLoading = createSelector(selector, ((state: IState) => state.serviceLoading));
        }

        return new Selects();
    }

    export function reducer(state: IState = {...initialState}, action: BooksActions.All): IState {

        switch (action.type) {

            case BooksActionTypes.PATCH_SERVICE_LOADING: {

                const serviceLoading = {
                    ...state.serviceLoading,
                    ...action.payload,
                };

                return {
                    ...state,
                    serviceLoading,
                };
            }

            case BooksActionTypes.GET_BOOKS: {

                return {
                    ...state,
                    query: action.payload,
                };
            }

            case BooksActionTypes.GET_BOOKS_SUCCESS: {

                const booksResponse = action.payload ? {...action.payload} : null;

                return {
                    ...state,
                    booksResponse,
                };
            }

            default:
                return state;
        }
    }
}
