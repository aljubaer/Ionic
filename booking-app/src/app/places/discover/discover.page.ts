import { PlacesService } from "./../places.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Place } from "../place.model";
import { SegmentChangeEventDetail } from "@ionic/core";
import { Subscription } from "rxjs";

@Component({
    selector: "app-discover",
    templateUrl: "./discover.page.html",
    styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit, OnDestroy {
    loadedPlaces: Place[];
    private placeSubscription: Subscription;

    constructor(private placesServices: PlacesService) {}

    ngOnInit() {
        this.placesServices.places.subscribe(places => {
            this.loadedPlaces = places;
        });
    }

    ngOnDestroy() {
        if (this.placeSubscription) {
            this.placeSubscription.unsubscribe();
        }
    }

    onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
        console.log(event.detail);
    }
}
