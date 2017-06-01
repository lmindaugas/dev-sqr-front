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
        // this.name = 'Jame B';
        // this.email = 'james@bombey.com';
        // this.address = {
        //     street: '12 main street',
        //     city: 'boston',
        //     state: 'MA'
        // }
        // this.hobbies = ['Music', 'Movies', 'Sport'];
        // this.showHobbies = false;
        // this.postsService.getPosts().subscribe(posts => {
        //     this.posts = posts;
        // })
        this.postsService = postsService;
        this.list = ['list 1', 'list 2', 'list 2'];
        this.lists = new Map;
        this.showLists = true;
        this.pointsPerPage = 10;
        this.getPoints();
    }
    // toggleHobbies() {
    //     this.showHobbies = this.showHobbies ? false : true;
    // }
    // addHobby(hobby: string) {
    //     this.hobbies.push(hobby);
    // }
    // deleteHobby(i: number) {
    //     this.hobbies.splice(i, 1);
    // }
    UserComponent.prototype.saveList = function (name) {
        this.list.push(name);
        this.lists.set(name, this.points);
        console.log("list of map: " + this.lists.size);
        // this.lists.forEach((key: string, value: Point[]) => {
        //     console.log(key, value);
        // });
    };
    UserComponent.prototype.deleteList = function (i) {
        //this.lists.(i, 1);
    };
    UserComponent.prototype.addPoint = function (x, y) {
        // send to rest
        this.postsService.addPoint({ x: x, y: y });
        // add to the current list
        //this.points.splice(0, 1, {x, y});
        this.points.push({ x: x, y: y });
        console.log("point added: " + "(" + x + "," + y + ")");
        this.points.forEach(function (element) {
            console.log("all points: " + "(" + element.x + ", " + element.y + ")");
        });
    };
    UserComponent.prototype.deletePoint = function (p, id) {
        // delete a point        
        var index = this.points.indexOf(p);
        var point = this.points.splice(index, 1)[0];
        // send to rest
        this.postsService.deletePoint(p);
        console.log("deleted point index: " + index);
        console.log("point deleted: " + "(" + p.x + "," + p.y + ")");
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