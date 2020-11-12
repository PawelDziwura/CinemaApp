import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSeanceComponent } from '../add-seance/add-seance.component';
import { Poster } from 'src/app/models/poster';
import { DomSanitizer } from '@angular/platform-browser';
import { faPlus, faVideo } from '@fortawesome/free-solid-svg-icons';
import { SeancesComponent } from '../seances/seances.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  faPlus = faPlus;
  faVideo = faVideo;

  movie: Movie;
  id: number;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private monvieService: MovieService,
    private router: Router,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.monvieService.getMovie(this.id).subscribe(result => {
      console.log(result)
      this.movie = result;
    })
  }

  getImage(poster: Poster) {
    if(!poster){
      return null;
    }
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + poster.image);
  }

  onEditClick(){
    this.router.navigate([`movie-edit/${this.id}`])
  }

  onAddSeanceClick(movie: Movie): void{
    var config = new MatDialogConfig();
    config.data = {
      movie: movie
    }
    this.dialog.open(AddSeanceComponent, config)
  }

  onChooseSeanceClick(movie: Movie): void{
    var config = new MatDialogConfig();
    config.data = {
      movie: movie
    }
    this.dialog.open(SeancesComponent, config)
  }

  get currentUser(): User{
    return this.userService.user
  }

}
