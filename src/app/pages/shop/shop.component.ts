import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Options } from 'ng5-slider';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { ICommodity } from 'src/app/shared/interfaces/commodity.interface';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];



  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  searchTerm: Array<string> = [];
  rangePrice: string;
  getCategory: Array<ICategory>
  getCommondity: Array<ICommodity>
  filterPRod: Array<ICommodity>;
  catID: string;
  checkRoutingInit: boolean;

  constructor(private firestore: AngularFirestore,
    private getCatService: BgServiceService,
    private route: ActivatedRoute) {
    this.getCategoris();
    this.getCommodityAll();
  }

  ngOnInit() {
  }

  checkRouting() {
    debugger
    this.catID = this.route.snapshot.paramMap.get('category');
    if (this.catID) {
      this.filterPRod = this.getCommondity.filter(product => product.nameCategory === this.catID)
    }
    // console.log(this.catID === null)
    if(this.catID !== null){
      this.checkRoutingInit = true;
      this.onCheckBoxChange(this.catID)
    }
  }
  filter(): void {
    this.filterPRod = this.getCommondity.filter(product => {
      return parseInt(product.price) >= this.value
        && parseInt(product.price) <= this.highValue
    });
  }

  onCheckBoxChange(type): void {
    debugger
    console.log(type)
    if(this.checkRoutingInit === true){
      if (this.searchTerm.indexOf(type) === -1) {
        this.searchTerm.push(type);
      } else {
        this.searchTerm.splice(this.searchTerm.indexOf(type), 1);
      }
    }
    else{
      if (this.searchTerm.indexOf(type.name) === -1) {
        this.searchTerm.push(type.name);
      } else {
        this.searchTerm.splice(this.searchTerm.indexOf(type.name), 1);
      }
    }
  }
  public getCategoris(): void {
    this.getCatService.getCategory().subscribe(
      arrayCat => {
        this.getCategory = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as ICategory;
        });
      }
    )
  }
  public getCommodityAll(): void {
    this.getCatService.getCommodityAll().subscribe(
      arrayComm => {
        this.getCommondity = arrayComm.map(comm => {
          return {
            id: comm.payload.doc.id,
            ...comm.payload.doc.data()
          } as ICommodity;
        });
        // initialize to page 1
        this.minValueProd();
        // this.allItems = this.getCommondity;
        // this.setPage(1);
        this.checkRouting();
      }
    )
  }
  // setPage(page: number) {
  //   this.pager = this.getCatService.getPager(this.allItems.length, page);
  //   this.filterPRod = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  //   this.filter();
  // }
  minValueProd() {
    this.filterPRod = this.getCommondity;
    if (this.getCommondity.length > 0) {
      let min = this.getCommondity[0].price;
      let max = min;
      this.getCommondity.map((val, i) => {
        if (parseInt(this.getCommondity[i].price) > parseInt(max)) max = this.getCommondity[i].price;
        if (parseInt(this.getCommondity[i].price) < parseInt(min)) min = this.getCommondity[i].price;
      })
      this.value = parseInt(min);
      this.highValue = parseInt(max);
      this.setNewCeil(parseInt(min), parseInt(max));
    }
  }
  setNewCeil(newCeil: number, newFloor: number): void {
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.ceil = newFloor;
    newOptions.floor = newCeil;
    this.options = newOptions;
  }
}
