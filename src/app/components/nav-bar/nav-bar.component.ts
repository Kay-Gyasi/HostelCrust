import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private alertify:AlertifyService) { }

  username = "";

  ngOnInit() {
  }

  loggedin(){
    this.username = JSON.parse(localStorage.getItem("token") || '{}').username;
    return localStorage.getItem('token');
  }

  logout:Boolean;

  onLogout(){
    this.logout = confirm("Do you want to log out?");

    if(this.logout){
      localStorage.removeItem('token');
      localStorage.removeItem('Cart');
      this.alertify.success("Logged out");
    }
  }

}
