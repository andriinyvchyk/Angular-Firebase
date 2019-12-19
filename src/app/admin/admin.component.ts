import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: firebase.User;
  constructor(private auth: AuthService) {
    this.authUser();
   }

  ngOnInit() {
  }
  authUser() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      })
  }
}
