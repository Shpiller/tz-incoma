import {Component, OnInit} from '@angular/core';
import {FavouritesService} from '../../services/favourites/favourites.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    get countFavourites() {
        return this.favouritesService.favourites.length;
    }

    constructor(private favouritesService: FavouritesService) {
    }

    ngOnInit() {
    }

}
