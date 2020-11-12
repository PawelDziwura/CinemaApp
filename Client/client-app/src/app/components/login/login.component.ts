import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiResponse } from 'src/app/models/apiResponse';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/utils/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService) { }

  onLoginClick(): void {
    this.userService.auth({
      email: this.email,
      password: this.password,
      } as User).subscribe(result => {
        if(result.validationMessages.length > 0){
          this.notificationService.showError('Wrong email or password.', 'Error');
          return;
        }
        else{
          this.notificationService.showSuccess('You are logged in.', 'Success!');
          this.userService.saveUser(result.data);
          this.userService.saveToken(result.token);
          if(this.currentUser.isAdmin == true)
            this.router.navigate(['admin-panel'])
          else
            this.router.navigate(['movies'])
        }
    })
  }

  ngOnInit(): void {
  }

  get currentUser(): User {
    return this.userService.user;
   }
}
