export namespace BooksInterfaces {

    export interface IListResponse {
        items: IVolume[];
        totalItems: number;
    }

    export interface IVolume {
        id: string;
        volumeInfo: {
            title: string;
            subtitle: string;
        };
    }
}
