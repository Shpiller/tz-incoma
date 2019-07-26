import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavouritesComponent} from './favourites.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [FavouritesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: FavouritesComponent,
            }
        ])
    ]
})
export class FavouritesModule {
}
