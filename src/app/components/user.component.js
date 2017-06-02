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
var points_service_1 = require("../services/points.service");
var square_service_1 = require("../services/square.service");
var list_service_1 = require("../services/list.service");
var UserComponent = (function () {
    function UserComponent(pointsService, squareService, listService) {
        this.pointsService = pointsService;
        this.squareService = squareService;
        this.listService = listService;
        this.pointsPerPage = 10;
        this.validation = new PointValidation;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.loadPoints();
        this.loadSquares();
        this.loadLists();
    };
    UserComponent.prototype.saveList = function (name) {
        var _this = this;
        if (name) {
            this.listService.save(name).subscribe(function (list) { if (_this.lists.indexOf(name) == -1)
                _this.lists.push(name); }, function (error) { return _this.toast('Error: ' + error); }, function () { return _this.toast("List saved!"); });
        }
        else {
            this.toast("List name is not valid!");
        }
    };
    UserComponent.prototype.removeList = function (list, i) {
        var _this = this;
        this.listService.remove(list).subscribe(function (list) { return _this.lists.splice(i, 1, list); }, function (error) { return _this.toast('Error: ' + error); }, function () { return _this.loadLists(); });
    };
    UserComponent.prototype.loadList = function (list) {
        var _this = this;
        this.listService.load(list)
            .subscribe(function (points) { return _this.points = points; }, function (error) { return _this.toast('Error: ' + error); }, function () { return _this.toast("List loaded!"); });
    };
    UserComponent.prototype.loadLists = function () {
        var _this = this;
        this.listService.get()
            .subscribe(function (lists) { return _this.lists = lists; }, function (error) { return _this.toast('Error: ' + error); }, function () { return _this.toast('Lists loaded!'); });
    };
    UserComponent.prototype.removePoint = function (point, id) {
        var _this = this;
        this.pointsService.remove(point).subscribe(function (point) { return _this.points = point; }, function (error) { return _this.toast('Error: ' + error); }, function () { return _this.update(); });
    };
    UserComponent.prototype.clearPoints = function () {
        var _this = this;
        this.pointsService.clear().subscribe(function (point) { return _this.points = []; }, function (error) { return _this.toast('Error: ' + error); }, function () { return _this.update(); });
    };
    UserComponent.prototype.fileUpload = function (event) {
        var _this = this;
        var files = event.target.files;
        if (files.length > 0) {
            this.pointsService.upload(files[0]).subscribe(function (point) { return _this.points = point; }, function (error) { return _this.toast('Error: ' + error); }, function () { return _this.update(); });
        }
    };
    UserComponent.prototype.loadPoints = function () {
        var _this = this;
        this.pointsService.get()
            .subscribe(function (points) { return _this.points = points; }, function (error) { return console.error('Error: ' + error); }, function () { return console.log('Points loaded!'); });
    };
    UserComponent.prototype.loadSquares = function () {
        var _this = this;
        this.squareService.get()
            .subscribe(function (squares) { return _this.squares = squares; }, function (error) { return _this.toast('Error: ' + error); }, function () { return _this.toast('Squares loaded!'); });
    };
    UserComponent.prototype.addPoint = function (x, y) {
        var _this = this;
        var point = { x: x, y: y };
        if (isNaN(point.x) || isNaN(point.x)) {
            this.toast("Invalid point argument!");
        }
        else if (this.validation.isLimitExceeded(this.points)) {
            this.toast("Point limits exceeded!");
        }
        else if (!this.validation.isInRange(point)) {
            this.toast("only range -5000 to 5000 is accepted!");
        }
        else if (this.validation.containDuplicate(point, this.points)) {
            this.toast("duplicates are not allowed!");
        }
        else {
            this.pointsService.add(point).subscribe(function (point) { return _this.points = point; }, function (error) { return _this.toast('Error: ' + error); }, function () { return _this.update(); });
        }
    };
    UserComponent.prototype.toast = function (message) {
        console.log(message);
    };
    UserComponent.prototype.update = function () {
        this.loadPoints();
        this.loadSquares();
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user',
        templateUrl: 'user.component.html',
        providers: [points_service_1.PointsService, square_service_1.SquareService, list_service_1.ListService]
    }),
    __metadata("design:paramtypes", [points_service_1.PointsService,
        square_service_1.SquareService,
        list_service_1.ListService])
], UserComponent);
exports.UserComponent = UserComponent;
var PointValidation = (function () {
    function PointValidation() {
    }
    PointValidation.prototype.isInRange = function (point) {
        var xValid = point.x <= PointValidation.MAX_RANGE_VALUE
            && point.x >= PointValidation.MIN_RANGE_VALUE;
        var yValid = point.y <= PointValidation.MAX_RANGE_VALUE
            && point.y >= PointValidation.MIN_RANGE_VALUE;
        return xValid && yValid;
    };
    PointValidation.prototype.isLimitExceeded = function (points) {
        return points.length > PointValidation.MAX_POINTS_AVAILABLE;
    };
    PointValidation.prototype.containDuplicate = function (point, points) {
        var res = false;
        points.forEach(function (p) {
            if (p.x == point.x && p.y == point.y) {
                res = true;
            }
        });
        return res;
        // return points.indexOf(point) > -1
    };
    return PointValidation;
}());
PointValidation.MAX_POINTS_AVAILABLE = 10000;
PointValidation.MIN_RANGE_VALUE = -5000;
PointValidation.MAX_RANGE_VALUE = 5000;
//# sourceMappingURL=user.component.js.map