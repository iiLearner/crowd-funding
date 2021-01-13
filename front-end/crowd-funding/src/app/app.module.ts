//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common';



//services
import { AuthService } from './_services/authentication.service';
import { SplashScreenComponent, SplashScreenService } from './_components';

//material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatDividerModule} from '@angular/material/divider'
import {MatIconModule} from '@angular/material/icon'


//components akapages
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

//routing
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { RequestsComponent } from './pages/requests/requests.component';

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}


@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    LoginComponent,
    HomeComponent,
    RequestsComponent
    ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    SplashScreenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
