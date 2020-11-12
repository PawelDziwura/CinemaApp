import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Seance } from 'src/app/models/seance';
import { DeleteSeanceComponent } from '../delete-seance/delete-seance.component';

@Component({
  selector: 'app-movie-seances',
  templateUrl: './movie-seances.component.html',
  styleUrls: ['./movie-seances.component.scss']
})
export class MovieSeancesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  seances: MatTableDataSource<Seance>
  displayedColumns: string[] = ['startDate', 'endDate', 'delete']

  id: number;
  movie: Movie;

  constructor(public movieService: MovieService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MovieSeancesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
     }

  ngOnInit(): void {
    this.movieService.getMovie(this.id).subscribe(result => {
      this.movie = result
      this.seances = new MatTableDataSource(result.seances);
      console.log(this.seances)
      this.seances.paginator = this.paginator;
    })
  }

  onDeleteClick(id: number){
    var config = new MatDialogConfig();
    config.data = {
      id: id
    }
    this.dialog.open(DeleteSeanceComponent, config);
  }

  onOkClick(){
    this.dialogRef.close();
  }
}
