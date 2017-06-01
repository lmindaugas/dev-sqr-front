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
var posts_service_1 = require("../services/posts.service");
var UserComponent = (function () {
    function UserComponent(postsService) {
        var _this = this;
        this.postsService = postsService;
        this.collection = [];
        this.name = 'Jame B';
        this.email = 'james@bombey.com';
        this.address = {
            street: '12 main street',
            city: 'boston',
            state: 'MA'
        };
        this.hobbies = ['Music', 'Movies', 'Sport'];
        this.showHobbies = false;
        this.postsService.getPosts().subscribe(function (posts) {
            _this.posts = posts;
        });
        this.pointsPerPage = 10;
        for (var i = 1; i <= 100; i++) {
            this.collection.push("item " + i);
        }
        this.getPoints();
    }
    UserComponent.prototype.toggleHobbies = function () {
        this.showHobbies = this.showHobbies ? false : true;
    };
    UserComponent.prototype.addHobby = function (hobby) {
        this.hobbies.push(hobby);
    };
    UserComponent.prototype.deleteHobby = function (i) {
        this.hobbies.splice(i, 1);
    };
    UserComponent.prototype.addPoint = function (x, y) {
        this.postsService.addPoint({ x: x, y: y });
    };
    UserComponent.prototype.getPoints = function () {
        var _this = this;
        this.postsService.getPoints().subscribe(function (points) {
            _this.points = points;
        });
    };
    UserComponent.prototype.fileChange = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            this.postsService.uploadFile(fileList[0]);
        }
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user',
        templateUrl: 'user.component.html',
        providers: [posts_service_1.PostsService]
    }),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map