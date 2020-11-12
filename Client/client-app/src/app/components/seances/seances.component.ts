import { Component, OnInit, Inject } from '@angular/core';
import { SeanceService } from 'src/app/services/seance.service';
import { MovieService } from 'src/app/services/movie.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/models/movie';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.scss']
})
export class SeancesComponent implements OnInit {

  movie: Movie;
  seanceDate: Date;
  nowTime: number = Date.now();
  url: string = null;
  errorMessage: String = null;

  constructor(private seanceService: SeanceService,
    private movieService: MovieService,
    private router: Router,
    public dialogRef: MatDialogRef<SeancesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.movie = data.movie
     }

  onSeanceClick(id: number){
    console.log(this.movie.seances.find(e => e.id == id).startDate)
    console.log(Date.now())
    //if(this.movie.seances.find(e => e.id == id).startDate.valueOf() > Date.now())
      this.url = "places/" + id;
    //else
    //  this.errorMessage = "This seance is out of date."
  }

  onCancelClick(){
    this.url = null;
    this.dialogRef.close();
  }

  onNextClick(){
    if(!this.url){
      this.errorMessage = "Please select any seance."
      return;
    }
    else{
      this.router.navigate([this.url])
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
  }
}
