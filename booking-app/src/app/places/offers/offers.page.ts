import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlacesService } from "../places.service";
import { Place } from "../place.model";
import { Router } from "@angular/router";
import { IonItemSliding } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
    selector: "app-offers",
    templateUrl: "./offers.page.html",
    styleUrls: ["./offers.page.scss"]
})
export class OffersPage implements OnInit, OnDestroy {
    loadedPlaces: Place[];
    private placeSubscription: Subscription;

    constructor(
        private placesServices: PlacesService,
        private router: Router
    ) {}

    ngOnInit() {
        this.placeSubscription = this.placesServices.places.subscribe(
            places => {
                this.loadedPlaces = places;
            }
        );
    }

    ngOnDestroy() {
        if (this.placeSubscription) {
            this.placeSubscription.unsubscribe();
        }
    }

    onOfferAdd() {
        this.router.navigateByUrl("/places/tabs/offers/new");
    }

    onEdit(id: string, slidingItem: IonItemSliding) {
        slidingItem.close();
        this.router.navigateByUrl("/places/tabs/offers/edit/" + id);
    }
}
