import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'

  ]
})


export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  loginForm: FormGroup
  error = ''

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required] 
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  //login form submitted
  submit(){

    this.submitted = true;

    // reset alerts on submit
    this.error = null;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
    .subscribe(
      data => {
        console.log(data)
        if(data['status'] == 202){
          this.router.navigate(['/home']);
        }else{
          this.error = "Login Failed, incorrect password!";
        }
        this.loading = false;
      }
    )

  }

}