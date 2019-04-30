import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
    providedIn: 'root'
})
export class BookingsService {
    private _bookings: Booking[] = [
        {
            id: 'xyz',
            placeId: 'p1',
            placeTitle: 'Dhaka',
            userId: 'abc',
            guestNumber: 2
        }
    ];

    constructor() {}

    get bookings() {
        return [...this._bookings];
    }
}
