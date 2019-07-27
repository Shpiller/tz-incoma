import {AppActions, AppActionsTypes} from './app.actions';
import {createSelector} from '@ngrx/store';
import {BooksInterfaces} from '../modules/books/interfaces/books.interfaces';

export namespace AppReducer {

    export interface IState {
        query: string;
        booksResponse: BooksInterfaces.IListResponse;
    }

    export interface ISelects {
        query: (state: IState) => string;
        booksResponse: (state: IState) => BooksInterfaces.IListResponse;
    }

    export function createStoreSelector(selector) {

        class Self implements ISelects {
            query = createSelector(selector, ((state: IState) => state.query));
            booksResponse = createSelector(selector, ((state: IState) => state.booksResponse));
        }

        return new Self();
    }

    const initialState: IState = {
        query: null,
        booksResponse: null,
    };

    export function reducer(state = initialState, action: AppActions.All): IState {

        switch (action.type) {

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
