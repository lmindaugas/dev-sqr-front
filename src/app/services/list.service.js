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
var ListService = (function () {
    function ListService(http) {
        this.http = http;
    }
    ListService.prototype.get = function () {
        var url = 'http://localhost:8090/lists';
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ListService.prototype.save = function (list) {
        var url = "http://localhost:8090/save?list=" + list;
        var headers = new http_1.Headers();
        return this.http.post(url, list, { headers: headers })
            .map(function (res) { return res.text; })
            .catch(function (error) { return Observable_1.Observable.throw("error:" + error); });
    };
    ListService.prototype.remove = function (point) {
        var url = "http://localhost:8090/remove?x=" + point.x + "&y=" + point.y;
        return this.http.delete(url)
            .map(function (res) { return res.text(); })
            .catch(function (error) { return Observable_1.Observable.throw('Server error'); }); // errors if any
    };
    ListService.prototype.upload = function (file) {
        var url = "http://localhost:8090/upload";
        var formData = new FormData();
        formData.append('file', file, file.name);
        var headers = new http_1.Headers();
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, formData, options)
            .map(function (res) { return res.text; })
            .catch(function (error) { return Observable_1.Observable.throw("error: " + error); });
    };
    return ListService;
}());
ListService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ListService);
exports.ListService = ListService;
var Point = (function () {
    function Point() {
    }
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=list.service.js.map