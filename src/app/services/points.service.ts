import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions, Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';


@Injectable()
export class PointsService {

    constructor(private http: Http) {
    }

    get(): Observable<Point[]> {
        let url = 'http://localhost:8090/points';

        return this.http.get(url)
            .map(res => res.json())
            .catch(error => Observable.throw(error.json().error || 'Server error'));
    }

    add(point: Point): Observable<Point[]> {
        let url = `http://localhost:8090/add?x=${point.x}&y=${point.y}`;
        let headers = new Headers();

        return this.http.post(url, point, { headers: headers })
            .map(res => res.text)
            .catch(error => Observable.throw("error:" + error));
    }

    remove(point: Point): Observable<Point[]> {
        let url = `http://localhost:8090/remove?x=${point.x}&y=${point.y}`;

        return this.http.delete(url)
            .map((res: Response) => res.text())
            .catch((error: any) => Observable.throw('Server error')); // errors if any
    }

    upload(file: File) {
        let url = `http://localhost:8090/upload`;
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, formData, options)
            .map(res => res.text)
            .catch(error => Observable.throw("error: " + error))
    }

}

export class Point {
    x: number;
    y: number;
}
