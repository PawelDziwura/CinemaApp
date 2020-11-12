import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/utils/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService) { }

    onRegisterClick(): void{
      this.userService.register({
        id: this.id,
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        isAdmin: false,
        orders: null,

      } as User).subscribe(result => {
        result.data as User,
        this.notificationService.showSuccess('Your account has been created corectly.', 'Success!');
        this.userService.saveUser(result.data),
        this.userService.saveToken(result.token),
        this.router.navigate(['users']),
        console.log("TOKEN: " + result.token + "USER: " + result.data)
      })
    }

  ngOnInit(): void {
  }

}
