import {Action} from '@ngrx/store';
import {BooksInterfaces} from '../components/books/interfaces/books.interfaces';

export namespace AppActionsTypes {
    export const GET_BOOKS = '[AppActions] GET_BOOKS';
    export const GET_BOOKS_SUCCESS = '[AppActions] GET_BOOKS_SUCCESS';
}

export namespace AppActions {

    export class GetBooks implements Action {

        readonly type = AppActionsTypes.GET_BOOKS;

        constructor(public payload: string) {
        }
    }

    export class GetBooksSuccess implements Action {

        readonly type = AppActionsTypes.GET_BOOKS_SUCCESS;

        constructor(public payload: BooksInterfaces.IVolume[]) {
        }
    }

    export type All =
        GetBooks
        | GetBooksSuccess;
}
