import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import {Location} from '@angular/common';
import { Poster } from 'src/app/models/poster';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieSeancesComponent } from '../movie-seances/movie-seances.component';
import { NotificationService } from 'src/utils/notification.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  id: number;
  movie: Movie;
  title: string;
  description: string;
  durationTime: string;
  genre: string;
  poster: Poster = ({id: null, image: null});
  inputFile: File;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private _location: Location,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(this.id).subscribe(result => {
      this.movie = result
    })
  }

  getImage(poster: Poster) {
    if(!poster)
      return null;
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + poster.image);
  }

  onSaveClick(): void{
    this.movie.title = (this.title == null) ? this.movie.title : this.title;
    this.movie.genre = (this.genre == null) ? this.movie.genre : this.genre;
    this.movie.description = (this.description == null) ? this.movie.description : this.description;
    this.movie.durationTime = (this.durationTime == null) ? this.movie.durationTime : this.durationTime;
    this.movie.poster.image = (this.poster.image == null) ? this.movie.poster.image : this.poster.image;

    this.movieService.editMovie(this.movie).subscribe(result => {
      this.notificationService.showSuccess('Movie data has been changed.', 'Success!');
      this._location.back();
    })
  }

  onCancelClick(){
    this._location.back();
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

  onSeancesClick(id: number){
    var config = new MatDialogConfig();
    config.data = {
      id: id
    }
    this.dialog.open(MovieSeancesComponent, config);
  }
}
