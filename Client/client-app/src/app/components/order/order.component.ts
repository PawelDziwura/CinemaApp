import { Component, OnInit } from '@angular/core';
import { SeanceService } from 'src/app/services/seance.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { User } from 'src/app/models/user';
import { Seance } from 'src/app/models/seance';
import { Place } from 'src/app/models/place';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  faArrowCircleLeft = faArrowCircleLeft;

  id: number;
  seance: Seance;
  userId: number;
  user: User;
  userPlaceList: Place[] = new Array();
  order: Order = {orderSeance: null, places: null, isRefundable: false, orderUser: null} as Order;

  constructor(
    private seanceService: SeanceService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    public dialog: MatDialog) { }

  onConfirmClick() {
    this.orderService.addOrder(
      {
        seanceId: this.seance.id,
        userId: this.user.id,
        startDate: this.seance.startDate,
        placesId: this.userPlaceList.map(p => p.id)
      }).subscribe(result => {
        this.dialog.open(ConfirmComponent);
      });
  }

  onReturnClick(){
    this._location.back();
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.seanceService.getSeanceById(this.id).subscribe(result => {
      this.seance = result;
      console.log(result)
    })
    this.userService.getById(this.userId).subscribe(result => {
      this.user = result;
      console.log(result)
    })

    this.userPlaceList = history.state.data;
    console.log(history.state.data)
  }

}
