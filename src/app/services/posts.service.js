"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/toPromise");
require("rxjs/add/observable/throw");
var PostsService = (function () {
    function PostsService(http) {
        this.http = http;
        console.log("Post service initialized");
    }
    PostsService.prototype.getPosts = function () {
        return this.http.get('https://jsonplaceholder.typicode.com/comments')
            .map(function (res) { return res.json(); });
    };
    PostsService.prototype.getPoints = function () {
        return this.http.get('http://localhost:8090/points')
            .map(function (res) { return res.json(); });
    };
    PostsService.prototype.addPoint = function (point) {
        var url = "http://localhost:8090/add?x=" + point.x + "&y=" + point.y;
        var headers = new http_1.Headers();
        return this.http
            .put(url, JSON.stringify(point), { headers: headers })
            .toPromise()
            .then(function () { return point; })
            .catch(this.handleError);
    };
    PostsService.prototype.deletePoint = function (point) {
        console.log("send request: " + point.x + point.y);
        var url = "http://localhost:8090/remove?x=" + point.x + "&y=" + point.y;
        var headers = new http_1.Headers();
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.delete(url, options)
            .toPromise()
            .catch(this.handleError);
        // return this.http
        //     .delete(url, JSON.stringify(point), options)
        //     .toPromise()
        //     .then(() => point)
        //     .catch(this.handleError);
    };
    PostsService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    PostsService.prototype.uploadFile = function (file) {
        var url = "http://localhost:8090/upload";
        var formData = new FormData();
        formData.append('file', file, file.name);
        var headers = new http_1.Headers();
        // headers.append('Content-Type', 'jsonmultipart/form-data');
        // headers.append('Accept', 'text/html');
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.put(url, formData, options)
            .map(function (res) { return res.toString(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); })
            .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
    };
    return PostsService;
}());
PostsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map