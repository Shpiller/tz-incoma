import {Component, OnInit} from '@angular/core';
import {FavouritesService} from '../../services/favourites/favourites.service';
import {faHeart, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    faSearch = faSearch;
    faHeart = faHeart;

    get countFavourites() {
        return this.favouritesService.favourites.length;
    }

    constructor(private favouritesService: FavouritesService) {
    }

    ngOnInit() {
    }

}
