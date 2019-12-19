import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ICard } from '../interfaces/mycard.interface';

@Injectable({
  providedIn: 'root'
})
export class BgServiceService {
  myCard: Array<ICard>;
  counterCard: number;
  private subject = new Subject<any>();

  constructor(private firestore: AngularFirestore) { }

  sendMessage(message: string): void {
        this.subject.next([ message ]);
        console.log(message)
    }

    clearMessage(): void {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }


  // get all category
  public getCategory() {
    return this.firestore.collection('category').snapshotChanges();
  }
  // get all Commodity
  public getCommodityAll() {
    return this.firestore.collection('commodity').snapshotChanges();
  }
  // get all category blog
  public getCategoryBlogs() {
    return this.firestore.collection('blogs').snapshotChanges();
  }
  // get all posts
  public getPosts() {
    return this.firestore.collection('posts').snapshotChanges();
  }
  // get one commodity
  public getCommodity(id: string): any {
    return this.firestore.collection('commodity').doc(id).get();
  }
  // get one orders
  public getOrdersAdmin(id: string): any {
    return this.firestore.collection('orders').doc(id).get();
  }
  // get one posts
  public getPost(id: string): any {
    return this.firestore.collection('posts').doc(id).get();
  }
  // get one user
  public getUser(id: string): any {
    return this.firestore.collection('users').doc(id).get();
  }
  // get all orders
  public getOrders() {
    return this.firestore.collection('orders').snapshotChanges();
  }
  // get all orders
  public getSubscribe() {
    return this.firestore.collection('subscribe').snapshotChanges();
  }
  public getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  public getMyCardCount(){
    if(localStorage.length > 0){
      this.myCard = JSON.parse(localStorage.getItem('myCard'));
      if(this.myCard.length > 0){
        this.counterCard = this.myCard.length
      }
      else{
        this.counterCard = 0;
      }
    }
    else{
      this.counterCard = 0;
    }
  }

  // pagination
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
