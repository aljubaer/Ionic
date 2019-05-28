import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { take, map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class PlacesService {
    private _places = new BehaviorSubject<Place[]>([
        // tslint:disable-next-line: max-line-length
        new Place(
            "p1",
            "Dhaka",
            "This is capital of Bangladesh",
            "https://upload.wikimedia.org/wikipedia/commons/5/5a/Gulshan%2C_Dhaka_%2826683335975%29.jpg",
            5000.0,
            new Date("2019-01-01"),
            new Date("2019-12-01"),
            "abs"
        ),
        new Place(
            "p2",
            "Barishal",
            "This is a local city of Bangladesh",
            // tslint:disable-next-line: max-line-length
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Bangabandhu_Uddyan_Aerial_View.jpg/1280px-Bangabandhu_Uddyan_Aerial_View.jpg",
            1000.0,
            new Date("2019-01-01"),
            new Date("2019-12-01"),
            "abs"
        ),
        new Place(
            "p3",
            "Chittagong",
            "This is a port city of Bangladesh",
            // tslint:disable-next-line: max-line-length
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Karnaphuli_River_at_night_%2802%29.jpg/1280px-Karnaphuli_River_at_night_%2802%29.jpg",
            2500.0,
            new Date("2019-01-01"),
            new Date("2019-12-01"),
            "abs"
        )
    ]);

    get places() {
        return this._places.asObservable();
    }

    constructor(private authService: AuthService) {}

    getPlace(id: string) {
        return this.places.pipe(
            take(1),
            map(places => {
                return { ...places.find(p => p.id === id) };
            })
        );
    }

    addPlace(
        title: string,
        description: string,
        price: number,
        dateFrom: Date,
        dateTo: Date
    ) {
        const newPlace = new Place(
            Math.random().toString(),
            title,
            description,
            "https://upload.wikimedia.org/wikipedia/commons/5/5a/Gulshan%2C_Dhaka_%2826683335975%29.jpg",
            price,
            dateFrom,
            dateTo,
            this.authService.userId
        );
        this.places.pipe(take(1)).subscribe(places => {
            this._places.next(places.concat(newPlace));
        });
        console.log(this._places);
    }
}
