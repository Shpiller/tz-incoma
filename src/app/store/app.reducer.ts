import {AppActions} from './app.actions';
import {createSelector} from '@ngrx/store';

export namespace AppReducer {

    export interface IState {
        books: any[];
    }

    export interface ISelects {
        books: (state: IState) => any[];
    }

    export function createStoreSelector(selector) {

        class Self implements ISelects {
            books = createSelector(selector, ((state: IState) => state.books));
        }

        return new Self();
    }

    const initialState: IState = {
        books: null,
    };

    export function reducer(state = initialState, action: AppActions.All): IState {

        switch (action.type) {

            case AppActions.Types.GET_BOOKS_SUCCESS: {

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
