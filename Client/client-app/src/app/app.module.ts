import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from './components/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from 'src/utils/app-interceptor';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoviesComponent } from './components/movies/movies.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AdminComponent } from './components/admin/admin.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { DeleteMovieComponent } from './components/delete-movie/delete-movie.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MovieComponent } from './components/movie/movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { AddSeanceComponent } from './components/add-seance/add-seance.component';
import { PlacesComponent } from './components/places/places.component';
import { SeancesComponent } from './components/seances/seances.component';
import { OrderComponent } from './components/order/order.component';
import { MatCardModule } from '@angular/material/card';
import { MeComponent } from './components/me/me.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MovieSeancesComponent } from './components/movie-seances/movie-seances.component';
import { DeleteSeanceComponent } from './components/delete-seance/delete-seance.component';
import { OrderRefundComponent } from './components/order-refund/order-refund.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    MoviesComponent,
    AddMovieComponent,
    AdminComponent,
    DeleteMovieComponent,
    EditUserComponent,
    MovieComponent,
    EditMovieComponent,
    AddSeanceComponent,
    PlacesComponent,
    SeancesComponent,
    OrderComponent,
    MeComponent,
    ConfirmComponent,
    MovieSeancesComponent,
    DeleteSeanceComponent,
    OrderRefundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    NgbModule,
    MatIconModule,
    FontAwesomeModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ToastrModule.forRoot(),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
