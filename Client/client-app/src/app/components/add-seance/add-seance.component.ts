import { Component, OnInit, Inject } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { SeanceService } from 'src/app/services/seance.service';
import { MovieService } from 'src/app/services/movie.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Seance } from 'src/app/models/seance';
import { Place } from 'src/app/models/place';
import { ArrayType } from '@angular/compiler';
import { newArray } from '@angular/compiler/src/util';
import { PlacesComponent } from '../places/places.component';
import { NotificationService } from 'src/utils/notification.service';

@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.scss']
})
export class AddSeanceComponent implements OnInit {

  movie: Movie;
  startDate: Date;
  endDate: Date;
  errorMessage: string;

  constructor(
    private seanceService: SeanceService,
    private notificationService: NotificationService,
    private movieService: MovieService,
    public dialogRef: MatDialogRef<AddSeanceComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.movie = data.movie
     }


  onAddClick(){
    this.seanceService.addSeance({
      startDate: this.startDate,
      endDate: this.endDate,
      movie: this.movie,
    } as Seance).subscribe(result => {
      if(result.validationMessages.length > 0)
        this.errorMessage = result.validationMessages[0];
      else{
        this.notificationService.showSuccess('Seance added', 'Success!');
        this.dialogRef.close()
        window.location.reload();
      }
     });
  }

  onCancelClick(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
