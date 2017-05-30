import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Point } from "../components/user.component";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostsService {

    private url = 'http://localhost:8090/'

    private headers = new Headers({ 'Content-Type': 'application/json' });

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

        let url = `${this.url}add?x=${point.x}&y=${point.y}`;

        return this.http
            .put(url, JSON.stringify(point), { headers: this.headers })
            .toPromise()
            .then(() => point)
            .catch(this.handleError);

        //this.http.put(url, JSON.stringify(point), {headers: this.headers})

        //console.log(point.x + point.y);
        //console.log(url);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}