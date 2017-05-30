import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    providers: [PostsService]
})
export class UserComponent {
    name: string;
    email: string;
    address: Address
    hobbies: string[]
    showHobbies: boolean;
    posts: Post[];
    points: Point[];

    constructor(private postsService: PostsService) {
        this.name = 'Jame B';
        this.email = 'james@bombey.com';
        this.address = {
            street: '12 main street',
            city: 'boston',
            state: 'MA'
        }
        this.hobbies = ['Music', 'Movies', 'Sport'];
        this.showHobbies = false;
        this.postsService.getPosts().subscribe(posts => {
            this.posts = posts;
        })

        this.getPoints();
    }

    toggleHobbies() {
        this.showHobbies = this.showHobbies ? false : true;
    }

    addHobby(hobby: string) {
        this.hobbies.push(hobby);
    }

    deleteHobby(i: number) {
        this.hobbies.splice(i, 1);
    }

    addPoint(x: number, y: number) {
        this.postsService.addPoint({ x, y });
        //this.getPoints();
    }

    getPoints() {
        this.postsService.getPoints().subscribe(points => {
            this.points = points;
        })
    }
}

interface Address {
    street: string;
    city: string;
    state: string;
}

interface Post {
    id: number;
    email: string;
    name: string;
    body: string;
}

interface Point {
    x: Number;
    y: Number;
}
