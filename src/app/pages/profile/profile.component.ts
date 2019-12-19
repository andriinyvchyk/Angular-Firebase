import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: firebase.User;
  userId: string;
  users: any;
  constructor(private auth: AuthService,
    private firestore: AngularFirestore,
    private productGet: BgServiceService) {
    this.authUser();
  }

  ngOnInit() {
  }

  authUser() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
        this.userId = this.user.uid;
        if (this.userId) {
          this.getUsers();
        }
      })
  }
  getUsers() {
    this.productGet.getUser(this.userId).subscribe(
      doc => {
        this.users = doc.data();
        console.log(this.users)
      }
    );
  }
}
