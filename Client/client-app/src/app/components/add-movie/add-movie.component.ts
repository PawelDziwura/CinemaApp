import { Component, OnInit, Inject } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { Movie } from 'src/app/models/movie';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Poster } from 'src/app/models/poster';
import { callbackify } from 'util';
import { NotificationService } from 'src/utils/notification.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  id: number;
  title: string;
  genre: string;
  durationTime: string;
  description: string;
  poster: Poster;
  inputFile: File;

  constructor(
    private movieService: MovieService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AddMovieComponent>) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onOkClick(){

      this.movieService.addMovie({
        id: this.id,
        title: this.title,
        genre: this.genre,
        durationTime: this.durationTime,
        description: this.description,
        poster: this.poster,
      } as Movie).subscribe(result => {
        this.notificationService.showSuccess('Movie added.', 'Success!');
        this.router.navigate(['movies']);
        this.dialogRef.close();
        window.location.reload();
      })
    }

    fileChangeEvent(files: FileList){
      var self = this;
      var file = files.item(0);

      var reader = new FileReader();
      reader.onload = function() {
        self.poster = { image: Array.from(new Uint8Array(this.result as ArrayBuffer)) } as Poster;
      }

      reader.readAsArrayBuffer(file);
    }

  ngOnInit(): void {
  }
}
