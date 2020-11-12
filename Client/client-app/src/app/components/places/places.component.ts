import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { SeanceService } from 'src/app/services/seance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Seance } from 'src/app/models/seance';
import {Location} from '@angular/common';
import { Place } from 'src/app/models/place';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { state } from '@angular/animations';


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  faArrowCircleRight = faArrowCircleRight;
  faArrowCircleLeft = faArrowCircleLeft;

  toggle: boolean[] = new Array(250);
  userPlaceList: Place[] = new Array();
  errorMessage: string = null;

  id: number;
  seance: Seance;

  constructor(
    private seanceService: SeanceService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location) { }

  onSelectClick(id: number):any{
    this.toggle[id] = !this.toggle[id];
    console.log(this.seance.places[id].isSelected)
    this.seance.places[id].isSelected = !this.seance.places[id].isSelected;
    console.log(this.seance.places[id].isSelected)

    if(this.seance.places[id].isSelected == true){
      this.userPlaceList.push(this.seance.places[id])
      console.log(this.userPlaceList)
    }

    if(this.seance.places[id].isSelected == false){
      var p = this.userPlaceList.find(p => p.number == id + 1)
      var index = this.userPlaceList.indexOf(p);
      this.userPlaceList.splice(index, 1)
      console.log(this.userPlaceList)
    }
  }

  onNextClick(){
    if(this.currentUser){
      console.log(this.seance)
      if(this.userPlaceList.length > 0)
        this.router.navigate([`orders/${this.id}/${this.currentUser.id}`], {state: {data: this.userPlaceList }})
      else
        this.errorMessage = "Please select any place."
    }
    else{
      this.router.navigate(['login'])
    }
  }

  onReturnClick(){
    this._location.back();
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.seanceService.getSeanceById(this.id).subscribe(result => {
      result.places = result.places.sort((o1,o2) => {
        if(o1.number > o2.number){
          return 1;
        }
        else if(o1.number < o2.number){
          return -1;
        }
        else{
          return 0;
        }
      });

      for(var i = 0; i < result.places.length; i++){
        this.toggle[i] = true;
      }

      this.seance = result;

    })
  }

  get currentUser(): User {
    return this.userService.user;
   }
}
