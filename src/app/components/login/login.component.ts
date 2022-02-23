import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginReq } from 'src/app/models/loginReq';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginReq:LoginReq = {
    email:"",
    password:""
  }

  constructor(private alertify:AlertifyService, private router:Router,
    private service:SharedService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    const token = this.service.authUser(this.loginReq).subscribe({
      next: data => {
        console.log(data),
        localStorage.setItem('token', JSON.stringify(data)),
        this.alertify.success("Successful Login"),
        this.router.navigate(['/']);
      },
      error: error => {this.alertify.failed("Invalid login"), form.reset()}
    });

    //setTimeout(() => this.router.navigate(['/']), 500);

  }

}
