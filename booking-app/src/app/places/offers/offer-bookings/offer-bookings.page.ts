import { PlacesService } from "./../../places.service";
import { NavController } from "@ionic/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Place } from "../../place.model";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: "app-offer-bookings",
    templateUrl: "./offer-bookings.page.html",
    styleUrls: ["./offer-bookings.page.scss"]
})
export class OfferBookingsPage implements OnInit, OnDestroy {
    place: Place;
    private placeSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private navController: NavController,
        private placesService: PlacesService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has("placeId")) {
                this.navController.navigateBack("/place/tabs/offers");
                return;
            }
            this.placeSubscription = this.placesService
                .getPlace(paramMap.get("placeId"))
                .subscribe(place => {
                    this.place = place;
                });
        });
    }

    ngOnDestroy() {
        if (this.placeSubscription) {
            this.placeSubscription.unsubscribe();
        }
    }
}
