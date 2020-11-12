import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';
import {Location} from '@angular/common';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderRefundComponent } from '../order-refund/order-refund.component';
import { Order } from 'src/app/models/order';
import { NotificationService } from 'src/utils/notification.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User;
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  urlId: number;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _location: Location) { }

  onSaveClick(): void{
    this.user.name = (this.name == null) ? this.user.name : this.name;
    this.user.surname = (this.surname == null) ? this.user.surname : this.surname;
    this.user.email = (this.email == null) ? this.user.email : this.email;
    this.user.password = (this.password == null) ? this.user.password : this.password;

    this.userService.editUser(this.user).subscribe(result => {
      this.notificationService.showSuccess('Your account data has been changed.', 'Success!');
      if(this.currentUser.isAdmin == true)
        this.router.navigate(['users'])
      else
        this.router.navigate(['user-edit'])
    })
  }

  ngOnInit(): void {
    this.urlId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getById(this.urlId).subscribe(result => {
      this.user = result
      console.log(this.user)
    })
  }

  onCancelClick(){
    this._location.back();
  }

  onOrderClick(order: Order){
    var config = new MatDialogConfig();
    config.data = {
      order: order
    }
    this.dialog.open(OrderRefundComponent, config);
  }

  get currentUser(): User {
    return this.userService.user;
  }

}
