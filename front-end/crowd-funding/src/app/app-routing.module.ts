import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RequestsComponent} from './pages/requests/requests.component';


//auth
import { AuthGuard } from './_helpers/auth.guard';


//add possible paths for the project here
const routes: Routes = [
  //home page
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
   //login page
   {
    path: 'requests',
    component: RequestsComponent
  },

  //login page
  {
    path: 'login',
    component: LoginComponent
  },


  // unknown route? go to home page
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
