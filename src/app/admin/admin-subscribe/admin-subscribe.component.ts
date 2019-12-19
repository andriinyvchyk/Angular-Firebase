import { Component, OnInit } from '@angular/core';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-subscribe',
  templateUrl: './admin-subscribe.component.html',
  styleUrls: ['./admin-subscribe.component.css']
})
export class AdminSubscribeComponent implements OnInit {
  getSubs: Array<any>
  constructor(private bgServiceService: BgServiceService,
    private firestore: AngularFirestore) {
    this.getSub();
   }

  ngOnInit() {
  }

  public getSub(): void {
    this.bgServiceService.getSubscribe().subscribe(
      arraySub => {
        this.getSubs = arraySub.map(sub => {
          return {
            id: sub.payload.doc.id,
            ...sub.payload.doc.data()
          } as any;
        });
      }
    )
  }
  onDelete(item): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('subscribe/' + item.id).delete();
    }
  }
}
