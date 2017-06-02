import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { Point } from "./points.service";

@Injectable()
export class PostsService {

    constructor(private http: Http) {
        console.log("Post service initialized")
    }

    getPosts() {
        return this.http.get('https://jsonplaceholder.typicode.com/comments')
            .map(res => res.json());
    }

    getPoints() {
        return this.http.get('http://localhost:8090/points')
            .map(res => res.json());
    }

    addPoint(point: Point) {
        let url = `http://localhost:8090/add?x=${point.x}&y=${point.y}`;

        let headers = new Headers();

        return this.http
            .put(url, JSON.stringify(point), { headers: headers })
            .toPromise()
            .then(() => point)
            .catch(this.handleError);
    }

    deletePoint(point: Point) {

        console.log("send request: " + point.x + point.y);

        let url = `http://localhost:8090/remove?x=${point.x}&y=${point.y}`;
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        this.http.delete(url, options)
            .toPromise()
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    uploadFile(file: File) {
        let url = `http://localhost:8090/upload`;

        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new Headers();
        // headers.append('Content-Type', 'jsonmultipart/form-data');
        // headers.append('Accept', 'text/html'); 
        let options = new RequestOptions({ headers: headers });
        this.http.put(url, formData, options)
            .map(res => res.toString())
            .catch(error => Observable.throw(error))
            .subscribe(
            data => console.log('success'),
            error => console.log(error)
            )
    }

}