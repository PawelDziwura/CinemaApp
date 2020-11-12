import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { User } from './models/user';
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-app';
  faUser = faUser;
  faUserPlus = faUserPlus;

  constructor(private userService: UserService, private router: Router) {}

  onLogout(){
    this.userService.logout();
    this.router.navigate(['login'])
  }

  ngOnInit(): void {
    this.userService.getUser();
  }

 get currentUser(): User {
  return this.userService.user;
 }
}
