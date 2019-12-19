import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { ICard } from 'src/app/shared/interfaces/mycard.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { ICommodity } from 'src/app/shared/interfaces/commodity.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: firebase.User;

  checkPass: boolean;
  getCategory: Array<ICategory>
  counterCardd: string;
  myCards: Array<ICard>
  search: string;
  getCommondity: Array<ICommodity>;


  message: any;
  subscription: any;

  constructor(private firestore: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private productGet: BgServiceService) {
    this.getBlogs();
    this.getCommodityAll()
    this.subscription = this.productGet.getMessage().subscribe(message => {
      this.message = message;
      console.log(this.message)
      console.log(this.message)
      if(this.message){
        this.counterCardd = this.message[0]
      }
    });
  }

  // нужно отписаться чтобы не выгружать память
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.productGet.getMyCardCount();
    this.counterCardd = `${this.productGet.counterCard}`


    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      })
  }


  searchProd() {
    let text = this.getCommondity.find(val => val.name == this.search);
    this.router.navigate([`/shop/${text.nameCategory}/${text.id}`]);
    this.search = ''
  }
  public getCommodityAll(): void {
    this.productGet.getCommodityAll().subscribe(
      arrayComm => {
        this.getCommondity = arrayComm.map(comm => {
          return {
            id: comm.payload.doc.id,
            ...comm.payload.doc.data()
          } as ICommodity;
        });
      }
    )
  }
  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }

  register() {
    this.router.navigate(['/register']);
  }

  public getBlogs() {
    this.firestore.collection('category').snapshotChanges().subscribe(
      arrayBlogs => {
        this.getCategory = arrayBlogs.map(blog => {
          return {
            id: blog.payload.doc.id,
            ...blog.payload.doc.data()
          } as ICategory;
        });
      }
    )
  }
}
