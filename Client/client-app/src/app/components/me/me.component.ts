import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  faArrowCircleLeft = faArrowCircleLeft;
  currentUser: User;

  constructor(
    private userService: UserService,
    private _location: Location,
    private router: Router) { }

  onReturnClick(){
    this._location.back();
  }

  onEditClick(){
    this.router.navigate(['user-edit/' + this.currentUser.id])
  }

  ngOnInit(): void {
    this.userService.getById(this.userService.user.id).subscribe(result => {
      this.currentUser = result;
      console.log(result)
    });
  }
}
