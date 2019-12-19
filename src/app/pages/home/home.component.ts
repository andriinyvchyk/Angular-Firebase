import { Component, OnInit } from '@angular/core';
import { NewProductService } from 'src/app/shared/services/new-product.service';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { ICommodity } from 'src/app/shared/interfaces/commodity.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  today: number = Date.now();
  arrayCommodity: Array<ICommodity>;

  constructor(
    private newProductService: BgServiceService
  ) {
    this.getNewRenderProd()
  }

  ngOnInit() {
  }

  getNewRenderProd() {
    this.newProductService.getCommodityAll().subscribe(
      arrayComm => {
        this.arrayCommodity = arrayComm.map(comm => {
          return {
            id: comm.payload.doc.id,
            ...comm.payload.doc.data()
          } as ICommodity;
        });
        this.filter();
      }
    )
  }
  filter() {
    // console.log(this.arrayCommodity.sort((a, b) => new Date(parseInt(b.date)).getHours() - new Date(parseInt(a.date)).getHours()))
    // this.arrayCommodity.sort((a, b) => new Date(parseInt(b.date)).getFullYear() - new Date(parseInt(a.date)).getFullYear());
    // this.arrayCommodity.splice(0, 1);
    this.arrayCommodity.sort((a, b): any => {
      new Date(parseInt(b.date)).getFullYear() - new Date(parseInt(a.date)).getFullYear();

    }).splice(7)
  }
}
