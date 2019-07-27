export namespace BooksInterfaces {

    export interface IListResponse {
        items: IVolume[];
        totalItems: number;
    }

    export interface IVolume {
        volumeInfo: {
            title: string;
            subtitle: string;
        };
    }
}
