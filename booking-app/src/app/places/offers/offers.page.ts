import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
    loadedPlaces: Place[];

    constructor(
        private placesServices: PlacesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadedPlaces = this.placesServices.places;
    }

    onOfferAdd() {
        this.router.navigateByUrl('/places/tabs/offers/new');
    }

    onEdit(id: string, slidingItem: IonItemSliding) {
        slidingItem.close();
        this.router.navigateByUrl('/places/tabs/offers/edit/' + id);
    }

}
