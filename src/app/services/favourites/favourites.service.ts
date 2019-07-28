import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {BooksInterfaces} from '../../modules/books/interfaces/books.interfaces';

@Injectable({
    providedIn: 'root'
})
export class FavouritesService {

    private localKey = 'favourites';
    private items: BooksInterfaces.IVolume[] = [];
    private keyMap: { [id: string]: BooksInterfaces.IVolume } = {};

    get favourites() {
        return this.items;
    }

    get favouritesMap() {
        return this.keyMap;
    }

    constructor(private storageService: StorageService) {
        this.initItems();
    }

    private initItems() {
        try {
            const readItems = this.storageService.local.getItem(this.localKey);
            this.items = JSON.parse(readItems) || [];

            this.keyMap = this.items.reduce((prev, curr) => {
                prev[curr.id] = curr;
                return prev;
            }, {});

        } catch (e) {
        }
    }

    toggleFavourites(book: BooksInterfaces.IVolume) {

        if (this.keyMap[book.id]) {
            this.removeFromFavourites(book.id);
        } else {
            this.addToFavourites(book);
        }
    }

    private addToFavourites(book: BooksInterfaces.IVolume) {

        this.items.push(book);
        this.keyMap[book.id] = book;

        this.saveItems();
    }

    removeFromFavourites(id: string) {

        const item = this.keyMap[id];

        this.items.splice(this.items.indexOf(item), 1);
        delete this.keyMap[id];

        this.saveItems();
    }

    private saveItems() {
        this.storageService.local.setItem(this.localKey, JSON.stringify(this.items));
    }
}
