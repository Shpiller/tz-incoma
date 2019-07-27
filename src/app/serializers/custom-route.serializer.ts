import {RouterStateSerializer} from '@ngrx/router-store';
import {Params, RouterStateSnapshot} from '@angular/router';

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
    data: { [key: string]: any };
}

export class CustomRouterSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: {queryParams},
        } = routerState;
        const {params, data} = route;

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return {url, params, queryParams, data};
    }
}
