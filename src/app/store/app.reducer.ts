import {AppActions, AppActionsTypes} from './app.actions';
import {createSelector} from '@ngrx/store';
import {BooksInterfaces} from '../modules/books/interfaces/books.interfaces';

export namespace AppReducer {

    export interface IState {
        query: string;
        books: BooksInterfaces.IVolume[];
    }

    export interface ISelects {
        query: (state: IState) => string;
        books: (state: IState) => BooksInterfaces.IVolume[];
    }

    export function createStoreSelector(selector) {

        class Self implements ISelects {
            query = createSelector(selector, ((state: IState) => state.query));
            books = createSelector(selector, ((state: IState) => state.books));
        }

        return new Self();
    }

    const initialState: IState = {
        query: 'angular',
        books: null,
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

                const books = (state.books || []).concat(action.payload || []);

                return {
                    ...state,
                    books,
                };
            }

            default: {
                return state;
            }
        }
    }
}
