import {Component, OnInit} from '@angular/core';
import {FavouritesService} from '../../services/favourites/favourites.service';
import {BooksInterfaces} from '../books/interfaces/books.interfaces';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

    favourites: BooksInterfaces.IVolume[] = [];

    constructor(private favouritesService: FavouritesService) {
    }

    ngOnInit() {
        this.favourites = this.favouritesService.favourites;
    }

    removeFromFavourites(id: string) {
        this.favouritesService.removeFromFavourites(id);
    }
}
