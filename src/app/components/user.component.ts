import { Component, OnInit, OnChanges } from '@angular/core';
import { PointsService, Point } from '../services/points.service';
import { SquareService } from "../services/square.service";
import { ListService } from "../services/list.service";


@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    providers: [PointsService, SquareService, ListService]
})
export class UserComponent implements OnInit {

    validation: PointValidation;
    points: Point[]
    squares: string[]
    lists: string[];
    pointsPerPage: number

    constructor(private pointsService: PointsService,
        private squareService: SquareService,
        private listService: ListService) {
            
        this.pointsPerPage = 10

        this.validation = new PointValidation;
    }

    ngOnInit(): void {
        this.loadPoints()
        this.loadSquares();
        this.loadLists();
    }

    saveList(name: string) {
        this.listService.save(name).subscribe(
            list => { if (this.lists.indexOf(name) == -1) this.lists.push(name) },
            error => this.toast('Error: ' + error),
            () => this.loadLists()
        );
    }

    removeList(list: string, i: number) {
        this.listService.remove(list).subscribe(
            list => this.lists.splice(i, 1, list),
            error => this.toast('Error: ' + error),
            () => this.loadLists()
        );
    }

    loadList(list: string) {
        this.listService.load(list)
            .subscribe(
            points => this.points = points,
            error => this.toast('Error: ' + error),
            () => this.toast("List loaded!"));
    }

    loadLists() {
        this.listService.get()
            .subscribe(
            lists => this.lists = lists,
            error => this.toast('Error: ' + error),
            () => this.toast('Lists loaded!'));
    }

    removePoint(point: Point, id: number) {
        this.pointsService.remove(point).subscribe(
            point => this.points = point,
            error => this.toast('Error: ' + error),
            () => this.update()
        );
    }

    clearPoints(){
        this.pointsService.clear().subscribe(
            point => this.points = [],
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
            () => console.log('Points loaded!')
            );
    }

    loadSquares() {
        this.squareService.get()
            .subscribe(
            squares => this.squares = squares,
            error => this.toast('Error: ' + error),
            () => this.toast('Squares loaded!')
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

