import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/shared/interfaces/mycard.interface';

@Component({
  selector: 'app-mycard',
  templateUrl: './mycard.component.html',
  styleUrls: ['./mycard.component.css']
})
export class MycardComponent implements OnInit {

  card: Array<ICard>;
  noProd: boolean;
  total: number = 0;

  constructor() {
    this.myCard();
  }

  ngOnInit() {
    if (localStorage.length > 0) {
      if (this.card.length === 0) {
        this.noProd = true;
      }
    }
  }
  myCard(): void {
    if (localStorage.length > 0) {
      this.card = JSON.parse(localStorage.getItem('myCard'));
      if (this.card.length) {
        this.totalOrder();
      }
    }
    else {
      this.noProd = true;
    }
  }
  totalOrder(): void {
    this.card = JSON.parse(localStorage.getItem('myCard'));
    let totalW: number = 0;
    this.card.map(val => {
      totalW += parseInt(val.countProd) * parseInt(val.price);
      this.total = totalW;
    })
  }
  delProd(id): void {
    this.card = JSON.parse(localStorage.getItem('myCard'));
    this.card.splice(id, 1);
    localStorage.setItem('myCard', JSON.stringify(this.card));
    if (this.card.length === 0) {
      this.noProd = true;
    }
    this.total = 0;
    this.totalOrder();
  }
  counterMinus(id) {
    this.card = JSON.parse(localStorage.getItem('myCard'));
    let totalW: number = 0;
    this.card.map((val, i, arr) => {
      if (val.id === id) {
        let numberCount = parseInt(arr[i].countProd);
        if (numberCount > 1) {
          numberCount--;
          arr[i].countProd = `${numberCount}`;
        }
      }
      totalW += parseInt(val.countProd) * parseInt(val.price);
      this.total = totalW;
    })

    localStorage.setItem('myCard', JSON.stringify(this.card));
  }
  counterPlus(id) {
    this.card = JSON.parse(localStorage.getItem('myCard'));
    let totalW: number = 0;
    this.card.map((val, i, arr) => {
      if (val.id === id) {
        let numberCount = parseInt(arr[i].countProd);
        numberCount++;
        arr[i].countProd = `${numberCount}`;
      }
      totalW += parseInt(val.countProd) * parseInt(val.price);
      this.total = totalW;
    })
    localStorage.setItem('myCard', JSON.stringify(this.card));
  }
}
