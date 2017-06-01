import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    providers: [PostsService]
})
export class UserComponent {
    // name: string;
    // email: string;
    // address: Address
    // hobbies: string[]
    // showHobbies: boolean;
    // posts: Post[];
    showLists: boolean;
    lists: Map<string, Point[]>
    list: string[];
    points: Point[];
    pointsPerPage: number;

    constructor(private postsService: PostsService) {
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

    saveList(name: string) {

        this.list.push(name);

        this.lists.set(name, this.points);

        console.log("list of map: " + this.lists.size);        

        // this.lists.forEach((key: string, value: Point[]) => {
        //     console.log(key, value);
        // });
    }

    deleteList(i: number) {
        //this.lists.(i, 1);
    }

    addPoint(x: number, y: number) {

        // send to rest
        this.postsService.addPoint({ x, y });

        // add to the current list
        //this.points.splice(0, 1, {x, y});
        this.points.push({ x, y });

        console.log("point added: " + "(" + x + "," + y + ")")
        this.points.forEach(element => {
            console.log("all points: " + "(" + element.x + ", " + element.y + ")");
        });
    }

    deletePoint(p: Point, id: number) {

        // delete a point        
        let index = this.points.indexOf(p);
        let point: Point = this.points.splice(index, 1)[0];

        // send to rest
        this.postsService.deletePoint(p);

        console.log("deleted point index: " + index);
        console.log("point deleted: " + "(" + p.x + "," + p.y + ")")
    }

    getPoints() {
        this.postsService.getPoints().subscribe(points => {
            this.points = points;
        })
    }

    fileChange(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.postsService.uploadFile(fileList[0]);
        }
    }

}

// interface Address {
//     street: string;
//     city: string;
//     state: string;
// }

// interface Post {
//     id: number;
//     email: string;
//     name: string;
//     body: string;
// }

export interface Point {
    x: Number;
    y: Number;
}

