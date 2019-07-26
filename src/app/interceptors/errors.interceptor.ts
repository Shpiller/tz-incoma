import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                event => {
                },
                err => {

                    let errorText = 'Unknown error';

                    if (err && err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            errorText = 'Auth error';
                        } else if (err.status === 404) {
                            errorText = '404 error';
                        } else if (err.status !== 400) {
                            errorText = 'Unknown HTTP error';
                        }
                    }

                    const notify: ToastrService = this.injector.get(ToastrService);
                    notify.error(errorText, null, {timeOut: 2000, closeButton: true});
                }
            )
        );
    }
}
