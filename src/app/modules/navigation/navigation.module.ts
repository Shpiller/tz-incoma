import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation.component';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [NavigationComponent],
    exports: [NavigationComponent],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
    ]
})
export class NavigationModule {
}
