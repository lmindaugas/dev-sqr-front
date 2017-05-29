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
var UserComponent = (function () {
    function UserComponent() {
        this.name = 'Jame B';
        this.email = 'james@bombey.com';
        this.address = {
            street: '12 main street',
            city: 'boston',
            state: 'MA'
        };
        this.hobbies = ['Music', 'Movies', 'Sport'];
        this.showHobbies = false;
    }
    UserComponent.prototype.toggleHobbies = function () {
        this.showHobbies = this.showHobbies ? false : true;
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'user',
        template: "\n    <h1>Hello {{name}}</h1>\n    <p>Email: {{email}}</p>\n    <p>Stret: {{address.street}}</p>\n    <button (click)=\"toggleHobbies()\">{{showHobbies?\"Hide hobbies\":\"Show hobbies\"}}</button>\n    <div *ngIf=\"showHobbies\">\n        <h3>Hobbies</h3>\n        <ul>\n            <li *ngFor=\"let hobby of hobbies\">\n                {{hobby}}\n            </li>\n        </ul>\n    </div>\n    <form>\n        <label>Name:</label><br/>\n        <input type=\"text\" name=\"name\" [(ngModel)]=\"name\" /> <br/>\n        <label>Name:</label><br/>\n        <input type=\"text\" name=\"name\" [(ngModel)]=\"name\" /> <br/>\n        <label>Name:</label><br/>\n        <input type=\"text\" name=\"name\" [(ngModel)]=\"name\" /> <br/>\n    </form>\n  ",
    }),
    __metadata("design:paramtypes", [])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map