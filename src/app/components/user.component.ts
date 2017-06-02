import { Component, OnInit, OnChanges } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { PointsService, Point } from '../services/points.service';
import { SquareService } from "../services/square.service";


@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    providers: [PostsService, PointsService, SquareService]
})
export class UserComponent implements OnInit {

    validation: PointValidation;
    showLists: boolean
    points: Point[]
    squares: string[]
    lists: string[];
    list: string[]
    pointsPerPage: number

    constructor(private postsService: PostsService,
                private pointsService: PointsService,
                private squareService: SquareService) {

        // mock
        this.list = ['list 1', 'list 2', 'list 2']

        this.lists = new Map

        this.showLists = true

        this.pointsPerPage = 10

        this.validation = new PointValidation;
    }

    ngOnInit(): void {
        this.loadPoints()
        this.loadSquares();
    }

    saveList(name: string) {
        this.lisService.add(point).subscribe(
                point => this.points = point,
                error => this.toast('Error: ' + error),
                () => this.update()
            );    
    }

    deleteList(i: number) {
    }

    removePoint(point: Point, id: number) {
        this.pointsService.remove(point).subscribe(
            point => this.points = point,
            error => this.toast('Error: ' + error),
            () => this.update()
        );
    }

    fileUpload(event: any) {
        let files: FileList = event.target.files;
        if (files.length > 0) {
            this.pointsService.upload(files[0]).subscribe(
                point => this.points = point,
                error => this.toast('Error: ' + error),
                () => this.update()
            );
        }
    }

    loadPoints() {
        this.pointsService.get()
            .subscribe(
            points => this.points = points,
            error => console.error('Error: ' + error),
            () => console.log('Loaded!')
            );
    }

    loadSquares(){
        this.squareService.get()
            .subscribe(
            squares => this.squares = squares,
            error => this.toast('Error: ' + error),
            () => this.toast('Loaded!')
            );
    }

    addPoint(x: number, y: number) {
        let point = { x, y };

        if (isNaN(point.x) || isNaN(point.x)) {
            this.toast("Invalid point argument!")
        } else if (this.validation.isLimitExceeded(this.points)) {
            this.toast("Point limits exceeded!")
        } else if (!this.validation.isInRange(point)) {
            this.toast("only range -5000 to 5000 is accepted!")
        } else if (this.validation.containDuplicate(point, this.points)) {
            this.toast("duplicates are not allowed!")
        } else {
            this.pointsService.add(point).subscribe(
                point => this.points = point,
                error => this.toast('Error: ' + error),
                () => this.update()
            );
        }
    }

    toast(message: string) {
        console.log(message);
    }

    update() {
        this.loadPoints()
        this.loadSquares()
    }
}

class PointValidation {

    public static readonly MAX_POINTS_AVAILABLE = 10000;
    public static readonly MIN_RANGE_VALUE = -5000;
    public static readonly MAX_RANGE_VALUE = 5000;

    isInRange(point: Point) {
        let xValid: boolean = point.x <= PointValidation.MAX_RANGE_VALUE
            && point.x >= PointValidation.MIN_RANGE_VALUE;
        let yValid: boolean = point.y <= PointValidation.MAX_RANGE_VALUE
            && point.y >= PointValidation.MIN_RANGE_VALUE;
        return xValid && yValid;
    }

    isLimitExceeded(points: Point[]) {
        return points.length > PointValidation.MAX_POINTS_AVAILABLE
    }

    containDuplicate(point: Point, points: Point[]) {
        let res: boolean = false;
        points.forEach(p => {
            if (p.x == point.x && p.y == point.y) {
                res = true;
            }
        });
        return res;
        // return points.indexOf(point) > -1
    }
}

