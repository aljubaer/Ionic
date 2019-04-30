import { Component, OnInit } from "@angular/core";
import { Route, ActivatedRoute } from "@angular/router";
import { PlacesService } from "../../places.service";
import { NavController } from "@ionic/angular";
import { Place } from '../../place.model';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: "app-edit-offer",
    templateUrl: "./edit-offer.page.html",
    styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit {
    place: Place;
    form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private placeService: PlacesService,
        private navControl: NavController
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(paraMap => {
            if (!paraMap.has('placeId')) {
                this.navControl.navigateBack('/places/tabs/offers');
                return;
            }
            this.place = this.placeService.getPlace(paraMap.get('placeId'));
            this.form = new FormGroup({
                title: new FormControl(this.place.title, {
                    updateOn: 'blur',
                    validators: [Validators.required]
                }),
                description: new FormControl(this.place.description, {
                    updateOn: 'blur',
                    validators: [Validators.required]
                })
            });
        });
    }

    onEditOffer() {
        if (!this.form) {
            return;
        }
        console.log(this.form);
    }
}
