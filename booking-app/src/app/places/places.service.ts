import { Injectable } from "@angular/core";
import { Place } from "./place.model";

@Injectable({
    providedIn: "root"
})
export class PlacesService {
    private _places: Place[] = [
        // tslint:disable-next-line: max-line-length
        new Place(
            "p1",
            "Dhaka",
            "This is capital of Bangladesh",
            "https://upload.wikimedia.org/wikipedia/commons/5/5a/Gulshan%2C_Dhaka_%2826683335975%29.jpg",
            5000.0,
            new Date("2019-01-01"),
            new Date("2019-12-01")
        ),
        new Place(
            "p2",
            "Barishal",
            "This is a local city of Bangladesh",
            // tslint:disable-next-line: max-line-length
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Bangabandhu_Uddyan_Aerial_View.jpg/1280px-Bangabandhu_Uddyan_Aerial_View.jpg",
            1000.0,
            new Date("2019-01-01"),
            new Date("2019-12-01")
        ),
        new Place(
            "p3",
            "Chittagong",
            "This is a port city of Bangladesh",
            // tslint:disable-next-line: max-line-length
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Karnaphuli_River_at_night_%2802%29.jpg/1280px-Karnaphuli_River_at_night_%2802%29.jpg",
            2500.0,
            new Date("2019-01-01"),
            new Date("2019-12-01")
        )
    ];

    get places() {
        return [...this._places];
    }

    getPlace(id: string) {
        return { ...this._places.find(p => p.id === id) };
    }

    constructor() {}
}
