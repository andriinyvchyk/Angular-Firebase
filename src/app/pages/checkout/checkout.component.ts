import { Component, OnInit } from '@angular/core';
import { ICheckout } from 'src/app/shared/interfaces/checkout.interface';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICard } from 'src/app/shared/interfaces/mycard.interface';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  formData: ICheckout;
  card: Array<ICard>;
  orderNotes: string;
  totalALL: number = 0;
  success: boolean;
  constructor(private firestore: AngularFirestore,
              private bdServers: BgServiceService) { }

  ngOnInit() {
    this.resetForm();
    this.card = JSON.parse(localStorage.getItem('myCard'));
    this.card.map((val, i) =>{
      this.totalALL += parseInt(val.countProd) * parseInt(val.price);
    })
  }
  public resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.formData = {
      id: null,
      idOrder: '',
      firstName: '',
      lastName: '',
      companyName: '',
      country: '',
      streetAddress: '',
      suite: '',
      townCity: '',
      stateCounty:'',
      postcode: '',
      phone: '',
      email: '',
      orderNotes: '',
      productOrder: [],
      productOrderPrice: null,
      dataOrder: '',
      orderCount: null
    }
    this.orderNotes = '';
  }
  public onSubmit(form: NgForm) {
    let today = new Date();
    let jstoday: string;
    jstoday = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;

    const data = Object.assign({}, form.value);
    data.productOrder = this.card;
    data.orderNotes = this.orderNotes;
    data.dataOrder = jstoday;
    data.productOrderPrice = this.totalALL;
    delete data.id;
    if (data.firstName && data.lastName && data.country && data.streetAddress && data.townCity && data.stateCounty && data.postcode && /^((380)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(data.phone) && /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(data.email) && this.orderNotes) {
      if (form.value.id == null) {
        this.firestore.collection('orders').add(data);
      } else {
        this.firestore.doc('orders/' + form.value.id).update(data);
      }
      localStorage.removeItem('myCard');
      this.resetForm();
      this.success = true;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    let number = 0;
    let self = this;
    self.bdServers.sendMessage(`${number}`);
    this.clearMessage();
  }
  clearMessage(): void {
    this.bdServers.clearMessage();
  }
}
