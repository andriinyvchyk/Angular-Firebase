import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {
  user: firebase.User;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })
  }

}
