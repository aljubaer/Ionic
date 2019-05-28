import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
    NavController,
    ModalController,
    ActionSheetController
} from "@ionic/angular";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";
import { Place } from "../../place.model";
import { PlacesService } from "../../places.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-place-detail",
    templateUrl: "./place-detail.page.html",
    styleUrls: ["./place-detail.page.scss"]
})
export class PlaceDetailPage implements OnInit, OnDestroy {
    place: Place;
    private placeSubsscription: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private navController: NavController,
        private modalController: ModalController,
        private placeService: PlacesService,
        private actionSheetController: ActionSheetController
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            console.log(paramMap);
            if (!paramMap.has("pathId")) {
                this.navController.navigateBack("/places/tabs/discover");
                return;
            }
            this.placeSubsscription = this.placeService
                .getPlace(paramMap.get("pathId"))
                .subscribe(place => {
                    this.place = place;
                });
        });
    }

    ngOnDestroy() {
        if (this.placeSubsscription) {
            this.placeSubsscription.unsubscribe();
        }
    }

    onBookPlace() {
        // this.router.navigateByUrl('/places/tabs/discover');
        // this.navController.navigateBack('/places/tabs/discover');
        this.actionSheetController
            .create({
                header: "Choose an action",
                buttons: [
                    {
                        text: "Select Date",
                        handler: () => {
                            this.openBookingModal("select");
                        }
                    },
                    {
                        text: "Random Date",
                        handler: () => {
                            this.openBookingModal("random");
                        }
                    },
                    {
                        text: "Cancel",
                        role: "cancel"
                    }
                ]
            })
            .then(actionSheetElement => {
                actionSheetElement.present();
            });
    }

    openBookingModal(mode: "select" | "random") {
        console.log(mode);
        this.modalController
            .create({
                component: CreateBookingComponent,
                componentProps: {
                    selectedPlace: this.place,
                    selectedMode: mode
                }
            })
            .then(modalElement => {
                modalElement.present();
                return modalElement.onDidDismiss();
            })
            .then(resultData => {
                console.log(resultData, resultData.role);
                if (resultData.role === "confirm") {
                    console.log("BOOKED!!");
                }
            });
    }
}
