import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DeleteMovieComponent } from '../delete-movie/delete-movie.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  id: number;
  user: User;

  users: MatTableDataSource<User>
  displayedColumns: string[] = ['properties', 'data']

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = Number(data.id);
     }

  get selectedUser(): User {
    return this.user;
  }

  onEditClick(){
    this.dialogRef.close();
    this.router.navigate(['user-edit/' + this.selectedUser.id])
  }

  onCancelClick(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userService.getById(this.id).subscribe((result) => {
      this.user = result;
    });
  }
}
