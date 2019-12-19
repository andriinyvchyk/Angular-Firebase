import { Component, OnInit } from '@angular/core';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { ICheckout } from 'src/app/shared/interfaces/checkout.interface';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  getBdOrders: Array<ICheckout>;
  modalOpen: boolean;
  ordersAdmin;
  ordersProdAdmin;
  orderID: string;
  constructor(private getService: BgServiceService,
              private firestore: AngularFirestore) { 
    this.getOrdersAll();
  }

  ngOnInit() {
  }

  modalOpens(id:string){
    console.log(id)
    this.orderID = id;
    this.getService.getOrdersAdmin(id).subscribe(
      doc => {
        this.ordersAdmin = doc.data();
        console.log(this.ordersAdmin)
        console.log(this.ordersAdmin.productOrder)
      }
    );
    this.modalOpen = true;
  }
  closeModal(){
    this.modalOpen = false;
  }
  success(){
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('orders/' + this.orderID).delete();
      this.modalOpen = false;
    }
  }
  public getOrdersAll(): void {
    this.getService.getOrders().subscribe(
      arrayOrders => {
        this.getBdOrders = arrayOrders.map(comm => {
          return {
            id: comm.payload.doc.id,
            ...comm.payload.doc.data()
          } as ICheckout;
        });
      }
    )
  }

}
