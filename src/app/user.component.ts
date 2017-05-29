import { Component } from '@angular/core';

@Component({
    selector: 'user',
    template: `
    <h1>Hello {{name}}</h1>
    <p>Email: {{email}}</p>
    <p>Stret: {{address.street}}</p>
    <button (click)="toggleHobbies()">{{showHobbies?"Hide hobbies":"Show hobbies"}}</button>
    <div *ngIf="showHobbies">
        <h3>Hobbies</h3>
        <ul>
            <li *ngFor="let hobby of hobbies">
                {{hobby}}
            </li>
        </ul>
    </div>
    <form>
        <label>Name:</label><br/>
        <input type="text" name="name" [(ngModel)]="name" /> <br/>
        <label>Name:</label><br/>
        <input type="text" name="name" [(ngModel)]="name" /> <br/>
        <label>Name:</label><br/>
        <input type="text" name="name" [(ngModel)]="name" /> <br/>
    </form>
  `,
})
export class UserComponent {
    name: string;
    email: string;
    address: address
    hobbies: string[]
    showHobbies : boolean;

    constructor() {
        this.name = 'Jame B';
        this.email = 'james@bombey.com';
        this.address = {
            street: '12 main street',
            city: 'boston',
            state: 'MA'
        }
        this.hobbies = ['Music', 'Movies', 'Sport'];
        this.showHobbies = false;
    }

    toggleHobbies(){
        this.showHobbies = this.showHobbies ? false : true;
    }

interface address {
    street: string;
    city: string;
    state: string;
}

}
