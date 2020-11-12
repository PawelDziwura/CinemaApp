import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from "./components/login/login.component";
import { MoviesComponent } from './components/movies/movies.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MovieComponent } from './components/movie/movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { PlacesComponent } from './components/places/places.component';
import { OrderComponent } from './components/order/order.component';
import { MeComponent } from './components/me/me.component';


const routes: Routes = [
  { path: 'user/:id', component: UserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user-edit/:id', component: EditUserComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'movies/add', component: AddMovieComponent },
  { path: 'movie-edit/:id', component: EditMovieComponent },
  { path: 'admin-panel', component: AdminComponent },
  { path: 'places/:id', component: PlacesComponent },
  { path: 'orders/:id/:userId', component: OrderComponent },
  { path: 'me', component: MeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
