import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICommodity } from 'src/app/shared/interfaces/commodity.interface';
import { Route, ActivatedRoute } from '@angular/router';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { ICard } from 'src/app/shared/interfaces/mycard.interface';

@Component({
  selector: 'app-commodity-details',
  templateUrl: './commodity-details.component.html',
  styleUrls: ['./commodity-details.component.css']
})
export class CommodityDetailsComponent implements OnInit {
  product: ICommodity;
  myCard: Array<ICard> = [];
  prodID: string;
  checkBtn: boolean;
  notice: boolean;
  counter = 1;
  constructor(
    private productGet: BgServiceService,
    private firestore: AngularFirestore,
    private route: ActivatedRoute) {
    this.getCommo();
  }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  private getCommo(): any {
    this.prodID = this.route.snapshot.paramMap.get('id');
    this.productGet.getCommodity(this.prodID).subscribe(
      doc => {
        this.product = doc.data();
      }
    );
  }
  btnDescription(): void {
    this.checkBtn = false;
  }
  btnReviews(): void {
    this.checkBtn = true;
  }
  counterPlus(): void {
    this.counter++;
  }
  counterMinus(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }
  addComm(): void {
    this.notice = true;
    setTimeout(() => {
      this.notice = false;
    }, 3000);

    if (localStorage.length === 0) {
      this.myCard.push({ id: this.prodID, name: this.product.name, img: this.product.img, price: this.product.price, countProd: `${this.counter}` })
      localStorage.setItem('myCard', JSON.stringify(this.myCard));
    }
    else if (localStorage.length != 0 && localStorage.getItem('myCard')) {
      let valueid;
      this.myCard = JSON.parse(localStorage.getItem('myCard'));
      this.myCard.map((value, index, array) => {
        valueid = value.id
        if (value.id === this.prodID) {
          let countParse = parseInt(array[index].countProd);
          countParse += this.counter;
          array[index].countProd = `${countParse}`;
        }
        localStorage.setItem('myCard', JSON.stringify(this.myCard));
      })
      if (valueid.indexOf(this.prodID) == -1) {
        this.myCard.push({ id: this.prodID, name: this.product.name, img: this.product.img, price: this.product.price, countProd: `${this.counter}` })
        localStorage.setItem('myCard', JSON.stringify(this.myCard));
      }
      // this.productGet.getMyCardCount();
    }
    let self = this;
    self.productGet.sendMessage(`${this.myCard.length}`);
    console.log(this.myCard.length)
    this.clearMessage();
  }
  clearMessage(): void {
    this.productGet.clearMessage();
  }
}