import { Component, OnInit, Inject } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { config } from 'rxjs';
import { NotificationService } from 'src/utils/notification.service';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.scss']
})
export class DeleteMovieComponent implements OnInit {

  id: number;

  constructor(
    private movieService: MovieService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<DeleteMovieComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(){
    this.movieService.deleteMovie(this.id).subscribe(result => {
      this.notificationService.showSuccess('Movie deleted.', 'Success!');
      this.dialogRef.close();
      window.location.reload();
    })
  }

  ngOnInit(): void {
  }

}
