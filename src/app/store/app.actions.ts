import {Action} from '@ngrx/store';

export namespace AppActions {

    export namespace Types {
        export const GET_BOOKS = '[AppActions] GET_BOOKS';
        export const GET_BOOKS_SUCCESS = '[AppActions] GET_BOOKS_SUCCESS';
    }

    export class GetBooks implements Action {

        readonly type = Types.GET_BOOKS;
    }

    export class GetBooksSuccess implements Action {

        readonly type = Types.GET_BOOKS_SUCCESS;

        constructor(public payload: any[]) {
        }
    }

    export type All =
        GetBooks
        | GetBooksSuccess;
}
