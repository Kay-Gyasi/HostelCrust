import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerInfo: Register = {
    FirstName:"",
    LastName:"",
    Email:"",
    Phone:"",
    Password:"",
    Address:""
  };

  constructor(private service:SharedService, private alertify:AlertifyService,
    private router:Router) { }

  ngOnInit() {
  }

  onSubmit(info:Register, form:NgForm){

    this.service.addUser(this.registerInfo).subscribe({
    next: data => {console.log(data), this.alertify.success("Registration successful");
    },
      error: error => {console.log(error.StatusText), this.alertify.success("You are already registered. Log in")}
  });
    form.reset();

    this.router.navigate(['/login']);
  }
}
