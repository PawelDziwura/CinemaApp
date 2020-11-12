import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { DeleteMovieComponent } from '../delete-movie/delete-movie.component';
import { Poster } from 'src/app/models/poster';
import { DomSanitizer } from '@angular/platform-browser';

interface MoviesFilter{
  title: string;
  genre: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  faPlus = faPlus;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  movies: MatTableDataSource<Movie>
  displayedColumns: string[] = ['poster', 'title', 'genre', 'dutation']

  titleFilter: string;
  genreFilter: string;

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog,
    private userService: UserService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.movieService.getAll().subscribe((result) => {

      this.movies = new MatTableDataSource(result);
      this.movies.paginator = this.paginator;

      this.movies.filterPredicate = (data, filter) =>
      {
        var filters = JSON.parse(filter) as MoviesFilter;
        return data.title.toLocaleLowerCase().startsWith(filters.title.toLocaleLowerCase()) &&
        data.genre.toLocaleLowerCase().startsWith(filters.genre.toLocaleLowerCase())
      }
    })
    if(this.currentUser?.isAdmin == true){
      this.displayedColumns.push("delete");
    }
  }

  applyFilter(){
    this.movies.filter = JSON.stringify({
      title: this.titleFilter ? this.titleFilter : '',
      genre: this.genreFilter ? this.genreFilter : '',
    } as MoviesFilter);
  }

  openDialog(): void {
    this.dialog.open(AddMovieComponent);
  }

  onDeleteClick(id: number, e: Event){
    e.preventDefault();
    e.stopPropagation();
    var config = new MatDialogConfig();
    config.data = {
      id: id
    }
    this.dialog.open(DeleteMovieComponent, config);
  }

  get currentUser(): User {
    return this.userService.user;
   }

  getImage(poster: Poster) {
    if(!poster)
      return null;
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + poster.image);
  }
}
