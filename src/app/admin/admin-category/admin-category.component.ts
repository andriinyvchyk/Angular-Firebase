import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ICommodity } from 'src/app/shared/interfaces/commodity.interface';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  nameCategory: string;
  arrayCategory: Array<ICategory>;
  formData: ICategory;
  iconsClick: string;
  editBtn: boolean;
  user: firebase.User;
  editID: string;
  lastCat: string;
  arrayCommodity: Array<ICommodity>
  constructor(private firestore: AngularFirestore,
    private getCatService: BgServiceService,
    private auth: AuthService
  ) {
    this.getCategoris();
    this.authUser();
    this.getCommodity()
  }

  ngOnInit() {
    this.resetForm();
  }

  public resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.formData = {
      id: null,
      nameCategory: '',
      date: '',
      author: '',
      icons: ''
    }
  }
  authUser() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      })
  }
  checkClickIcons(e: HTMLElement): void {
    if (e.className.indexOf('fas') != -1) {
      this.iconsClick = e.className;
    }
  }
  reset(): void {
    this.iconsClick = '';
    this.resetForm();
  }
  public onSubmit(form: NgForm) {
    let today = new Date();
    let jstoday: string;
    jstoday = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;

    const data = Object.assign({}, form.value);
    data.nameCategory = data.nameCategory.toLowerCase();
    data.date = jstoday;
    data.author = this.user.displayName;
    data.icons = this.iconsClick;
    delete data.id;
    if (data.nameCategory && data.icons) {
      if (this.editID == null) {
        this.firestore.collection('category').add(data);
      } else {
        this.firestore.doc('category/' + this.editID).update(data);
        this.editBtn = false;

        this.arrayCommodity.map((val, i, arr) => {
          if (this.lastCat === val.nameCategory) {
            let washingtonRef = this.firestore.collection("commodity").doc(`${val.id}`);
            return washingtonRef.update({
              "nameCategory": `${data.nameCategory}`
            })
          }
        })
      }
      this.resetForm();
      this.getCategoris();
    }
  }
  public getCommodity(): void {
    this.getCatService.getCommodityAll().subscribe(
      arrayComm => {
        this.arrayCommodity = arrayComm.map(comm => {
          return {
            id: comm.payload.doc.id,
            ...comm.payload.doc.data()
          } as ICommodity;
        });
      }
    )
  }
  public getCategoris(): void {
    this.getCatService.getCategory().subscribe(
      arrayCat => {
        this.arrayCategory = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as ICategory;
        });
      }
    )
  }

  onEdit(edit) {
    this.lastCat = edit.nameCategory;
    this.editID = edit.id
    console.log(edit.id)
    this.editBtn = true;
    this.formData = Object.assign({}, edit);
    console.log(edit)
  }
  onDelete(id: string): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('category/' + id).delete();
    }
  }



}
