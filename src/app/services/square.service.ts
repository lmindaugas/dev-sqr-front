import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions, Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class SquareService {

    constructor(private http: Http) {
    }

    get(): Observable<string[]> {
        let url = 'http://localhost:8090/squares';

        return this.http.get(url)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json().error || 'Server error'));
    }
}
