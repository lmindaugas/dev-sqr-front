import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions, Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Point } from "./points.service";


@Injectable()
export class ListService {

    constructor(private http: Http) {
    }

    get(): Observable<string[]> {
        let url = 'http://localhost:8090/lists';

        return this.http.get(url)
            .map(res => res.json())
            .catch(error => Observable.throw('error: ' + error));
    }

    load(list: string): Observable<Point[]> {
        let url = `http://localhost:8090/list?list=${list}`;

        return this.http.get(url)
            .map(res => res.json())
            .catch(error => Observable.throw('error: ' + error));
    }

    save(list: string): Observable<string[]> {
        let url = `http://localhost:8090/save?list=${list}`;
        let headers = new Headers();

        return this.http.post(url, list, { headers: headers })
            .map(res => res.text)
            .catch(error => Observable.throw("error:" + error));
    }

    remove(list: string) {
        console.log("service: " + list)

        let url = `http://localhost:8090/removeList?list=${list}`;

        return this.http.delete(url)
            .map((res: Response) => res.text())
            .catch((error: any) => Observable.throw('Server error')); // errors if any
    }
}